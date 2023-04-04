<?php

require_once './app/model/publico-alvo.php';
require_once './app/repository/repositorio-publico-alvo.php';
require_once './app/exception/repositorio-exception.php';

class RepositorioPublicoAlvoEmBDR implements RepositorioPublicoAlvo {
    private $pdo = null;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    function todos() {
        try {
            $preparedStatement = $this->pdo->prepare('SELECT * FROM publico_alvo');
            $preparedStatement->execute();
            $linhas = $preparedStatement->fetchAll(PDO::FETCH_ASSOC);

            foreach($linhas as $publicoAlvo) {
                $array []= new PublicoAlvo(
                    $publicoAlvo['id'],
                    $publicoAlvo['descricao']
                );
            }

            return $array;
        } catch (Exception $e) {
            throw new RepositorioException('Não foi possível consultar públicos_alvo. ' . $e->getMessage());
        }
    }

    function cadastrar($dadosPublicoAlvo) {
        try {
            $preparedStatement = $this->pdo->prepare('INSERT INTO publico_alvo (descricao) VALUES (:descricao)');
            $preparedStatement->execute([
                'descricao' => $dadosPublicoAlvo['descricao']
            ]);
            $idRetornado = $this->pdo->lastInsertId();
            return $idRetornado;
        } catch (Exception $e) {
            throw new RepositorioException('Não foi possível cadastrar público_alvo. ' . $e->getMessage());
        }
    }

    function porId($id) {
        try {
            $preparedStatement = $this->pdo->prepare('SELECT id, descricao FROM publico_alvo WHERE id = :id');
            $preparedStatement->setFetchMode(PDO::FETCH_ASSOC);
            $preparedStatement->execute([
                'id' => $id
            ]);
            if ($preparedStatement->rowCount() < 1) {
                throw new RepositorioException('Público alvo não encontrado.');
            }
            $publicoAlvo = $preparedStatement->fetch();
            return new PublicoAlvo($publicoAlvo['id'], $publicoAlvo['descricao']);
        } catch (Exception $e) {
            throw new RepositorioException($e->getMessage(), $e->getCode());
        }
    }

    public function publicosAlvoPorAviso($avisoId) {
        try {
            $preparedStatement = $this->pdo->prepare('SELECT pa.id, pa.descricao  FROM publico_alvo pa JOIN publico_alvo_aviso paa ON pa.id = paa.publico_alvo_id WHERE paa.aviso_id = :aviso_id');
            $preparedStatement->execute([
                'aviso_id' => $avisoId
            ]);
            $linhas = $preparedStatement->fetchAll(PDO::FETCH_ASSOC);

            foreach($linhas as $publicoAlvo) {
                $array []= new PublicoAlvo($publicoAlvo['id'], $publicoAlvo['descricao']);
            }
            return $array;
        } catch (Exception $e) {
            throw new RepositorioException($e->getMessage(), $e->getCode());
        }
    }
}

?>