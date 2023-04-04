<?php

use phputil\TDate;
use phputil\TTime;

require_once './app/model/aviso.php';
require_once './app/repository/repositorio-aviso.php';
require_once './app/exception/repositorio-exception.php';

class RepositorioAvisoEmBDR implements RepositorioAviso {
    private $pdo = null;
    private $repositorioSetor;
    private $repositorioPublicoAlvo;
    private $repositorioPeriodoExibicao;

    public function __construct(PDO $pdo, $repositorioSetor, $repositorioPublicoAlvo, $repositorioPeriodoExibicao) {
        $this->pdo = $pdo;
        $this->repositorioSetor = $repositorioSetor;
        $this->repositorioPublicoAlvo = $repositorioPublicoAlvo;
        $this->repositorioPeriodoExibicao = $repositorioPeriodoExibicao;
    }

    function todos($offset = 1) {
        try {
            $preparedStatement = $this->pdo->prepare('SELECT id, mensagem, eh_urgente, setor_id, validade FROM aviso LIMIT 10 OFFSET ' . ($offset - 1) * 10);
            $preparedStatement->execute();
            $linhas = $preparedStatement->fetchAll(PDO::FETCH_ASSOC);

            if (empty($linhas)) {
                return [];
            }

            foreach($linhas as $aviso) {
                $array []= new Aviso(
                    $aviso['id'],
                    $aviso['mensagem'],
                    $aviso['eh_urgente'],
                    new TDate($aviso['validade']),
                    $this->repositorioSetor->porId($aviso['setor_id']),
                    $this->repositorioPublicoAlvo->publicosAlvoPorAviso($aviso['id']),
                    $this->repositorioPeriodoExibicao->periodosExibicaoPorAviso($aviso['id'])
                );
            }

            return $array;
        } catch (Exception $e) {
            throw new RepositorioException('Não foi possível consultar avisos. ' . $e->getMessage());
        }
    }

    function todosValidos() {
        try {
            $hoje = new TDate();
            $preparedStatement = $this->pdo->prepare('SELECT id, mensagem, eh_urgente, setor_id, validade FROM aviso WHERE validade >= :hoje');
            $preparedStatement->execute([
                ':hoje' => $hoje->toDatabaseDateString()
            ]);
            $linhas = $preparedStatement->fetchAll(PDO::FETCH_ASSOC);

            if (empty($linhas)) {
                return [];
            }

            foreach($linhas as $aviso) {
                $array []= new Aviso(
                    $aviso['id'],
                    $aviso['mensagem'],
                    $aviso['eh_urgente'],
                    new TDate($aviso['validade']),
                    $this->repositorioSetor->porId($aviso['setor_id']),
                    $this->repositorioPublicoAlvo->publicosAlvoPorAviso($aviso['id']),
                    $this->repositorioPeriodoExibicao->periodosExibicaoPorAviso($aviso['id'])
                );
            }

            return $array;
        } catch (Exception $e) {
            throw new RepositorioException('Não foi possível consultar avisos. ' . $e->getMessage());
        }
    }

    function porId($id) {
        try {
            $preparedStatement = $this->pdo->prepare('SELECT id, mensagem, eh_urgente, setor_id, validade FROM aviso WHERE id = :id');
            $preparedStatement->setFetchMode(PDO::FETCH_ASSOC);
            $preparedStatement->execute([
                'id' => $id
            ]);
            if ($preparedStatement->rowCount() < 1) {
                throw new RepositorioException('Aviso não encontrado.');
            }
            $aviso = $preparedStatement->fetch();
            return new Aviso(
                $aviso['id'],
                $aviso['mensagem'],
                $aviso['eh_urgente'],
                new TDate($aviso['validade']),
                $this->repositorioSetor->porId($aviso['setor_id']),
                $this->repositorioPublicoAlvo->publicosAlvoPorAviso($aviso['id']),
                $this->repositorioPeriodoExibicao->periodosExibicaoPorAviso($aviso['id'])
            );
        } catch (Exception $e) {
            throw new RepositorioException($e->getMessage(), $e->getCode());
        }
    }

    function cadastrar(Aviso $aviso, $periodosExibicaoIds, $publicosAlvoIds) {
        try {
            $this->pdo->beginTransaction();
            $preparedStatement = $this->pdo->prepare('INSERT INTO aviso (mensagem, eh_urgente, setor_id, validade) VALUES (:mensagem, :eh_urgente, :setor_id, :validade)');
            $preparedStatement->execute([
                'mensagem' => $aviso->mensagem,
                'eh_urgente' => $aviso->ehUrgente,
                'setor_id' => $aviso->setor->id,
                'validade' => $aviso->validade->dateString()
            ]);
            $idRetornado = $this->pdo->lastInsertId();
            $this->relacionarPeriodosExibicao($idRetornado, $periodosExibicaoIds);
            $this->relacionarPublicosAlvo($idRetornado, $publicosAlvoIds);
            $this->pdo->commit();
            return $idRetornado;
        } catch (Exception $e) {
            $this->pdo->rollBack();
            throw new RepositorioException('Não foi possível cadastrar aviso. ' . $e->getMessage());
        }
    }

    private function relacionarPeriodosExibicao($avisoId, $periodosExibicaoIds) {
        try {
            foreach($periodosExibicaoIds as $id) {
                $preparedStatement = $this->pdo->prepare('INSERT INTO periodo_exibicao_aviso (aviso_id, periodo_exibicao_id) VALUES (:aviso_id, :periodo_exibicao_id)');
                $preparedStatement->execute([
                    'aviso_id' => $avisoId,
                    'periodo_exibicao_id' => $id
                ]);
            }
        } catch(Exception $e) {
            throw new RepositorioException('Não foi possível relacionar aviso com período de exibição. ' . $e->getMessage());
        }
    }

    private function relacionarPublicosAlvo($avisoId, $publicosAlvoIds) {
        try {
            foreach($publicosAlvoIds as $id) {
                $preparedStatement = $this->pdo->prepare('INSERT INTO publico_alvo_aviso (aviso_id, publico_alvo_id) VALUES (:aviso_id, :publico_alvo_id)');
                $preparedStatement->execute([
                    'aviso_id' => $avisoId,
                    'publico_alvo_id' => $id
                ]);
            }
        } catch(Exception $e) {
            throw new RepositorioException('Não foi possível relacionar aviso com público-alvo. ' . $e->getMessage());
        }
    }

    function remover($id) {
        try {
            $preparedStatement = $this->pdo->prepare('DELETE FROM aviso WHERE id = ?; DELETE FROM publico_alvo_aviso WHERE aviso_id = ?; DELETE FROM periodo_exibicao_aviso WHERE aviso_id = ?');
            $preparedStatement->execute([
                $id, $id, $id
            ]);

            if ($preparedStatement->rowCount() < 1) {
                throw new RepositorioException('Aviso não encontrado');
            }

            return $id;
        } catch (Exception $e) {
            throw new RepositorioException('Não foi possível remover aviso. ' . $e->getMessage());
        }
    }

    function alterar(Aviso $aviso, $periodosExibicaoIds, $publicosAlvoIds) {
        try {
            $this->pdo->beginTransaction();
            $preparedStatement = $this->pdo->prepare('UPDATE aviso SET mensagem = :mensagem, eh_urgente = :eh_urgente, setor_id = :setor_id, validade = :validade WHERE id = :id');
            $preparedStatement->execute([
                'mensagem' => $aviso->mensagem,
                'eh_urgente' => $aviso->ehUrgente,
                'setor_id' => $aviso->setor->id,
                'validade' => $aviso->validade->dateString(),
                'id' => $aviso->id
            ]);
            $this->excluirPeriodosExibicao($aviso->id);
            $this->excluirPublicosAlvo($aviso->id);
            $this->relacionarPeriodosExibicao($aviso->id, $periodosExibicaoIds);
            $this->relacionarPublicosAlvo($aviso->id, $publicosAlvoIds);
            $this->pdo->commit();
        } catch (Exception $e) {
            $this->pdo->rollBack();
            throw new RepositorioException('Não foi possível alterar aviso. ' . $e->getMessage());
        }
    }

    private function excluirPeriodosExibicao($avisoId) {
        try {
            $preparedStatement = $this->pdo->prepare('DELETE FROM periodo_exibicao_aviso WHERE aviso_id = :aviso_id');
            $preparedStatement->execute([
                'aviso_id' => $avisoId
            ]);
        } catch(Exception $e) {
            throw new RepositorioException('Não foi possível excluir o período de exibição. ' . $e->getMessage());
        }
    }

    private function excluirPublicosAlvo($avisoId) {
        try {
            $preparedStatement = $this->pdo->prepare('DELETE FROM publico_alvo_aviso WHERE aviso_id = :aviso_id');
            $preparedStatement->execute([
                'aviso_id' => $avisoId
            ]);
        } catch(Exception $e) {
            throw new RepositorioException('Não foi possível excluir o público-alvo. ' . $e->getMessage());
        }
    }

    function clonarAviso(Aviso $aviso, $periodosExibicaoIds, $publicosAlvoIds) {
        try {
            $this->pdo->beginTransaction();
            $preparedStatement = $this->pdo->prepare('INSERT INTO aviso (mensagem, eh_urgente, setor_id, validade) VALUES (:mensagem, :eh_urgente, :setor_id, :validade)');
            $preparedStatement->execute([
                'mensagem' => $aviso->mensagem,
                'eh_urgente' => $aviso->ehUrgente,
                'setor_id' => $aviso->setor->id,
                'validade' => $aviso->validade->dateString()
            ]);
            $idRetornado = $this->pdo->lastInsertId();
            $this->relacionarPeriodosExibicao($idRetornado, $periodosExibicaoIds);
            $this->relacionarPublicosAlvo($idRetornado, $publicosAlvoIds);
            $this->pdo->commit();
            return $idRetornado;
        } catch (Exception $e) {
            $this->pdo->rollBack();
            throw new RepositorioException('Não foi possível clonar o aviso. ' . $e->getMessage());
        }
    }
}

?>