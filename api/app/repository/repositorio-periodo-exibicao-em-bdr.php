<?php

require_once './app/model/periodo-exibicao.php';
require_once './app/repository/repositorio-periodo-exibicao.php';
require_once './app/exception/repositorio-exception.php';

class RepositorioPeriodoExibicaoEmBDR implements RepositorioPeriodoExibicao {

    private $pdo = null;

    function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    function todos() {
        try {
            $preparedStatement = $this->pdo->prepare('SELECT id, descricao, hora_inicio, hora_fim FROM periodo_exibicao');
            $preparedStatement->setFetchMode(PDO::FETCH_ASSOC);
            $preparedStatement->execute();
            if ($preparedStatement->rowCount() < 1) {
                throw new RepositorioException('Períodos não encontrados.');
            }
            $periodos = [];
            foreach($preparedStatement as $s) {
                $periodos []= new PeriodoExibicao(
                    $s['id'],
                    $s['descricao'],
                    $s['hora_inicio'],
                    $s['hora_fim']
                );
            }
            return $periodos;
        } catch (Exception $e) {
            throw new RepositorioException($e->getMessage(), $e->getCode());
        }
    }

    function porId($id) {
        try {
            $preparedStatement = $this->pdo->prepare('SELECT id, descricao, hora_inicio, hora_fim FROM periodo_exibicao WHERE id = :id');
            $preparedStatement->setFetchMode(PDO::FETCH_ASSOC);
            $preparedStatement->execute([
                'id' => $id
            ]);
            if ($preparedStatement->rowCount() < 1) {
                throw new RepositorioException('Período de exibição não encontrado.');
            }
            $periodo = $preparedStatement->fetch();
            return new PeriodoExibicao($periodo['id'], $periodo['descricao'], $periodo['hora_inicio'], $periodo['hora_fim']);
        } catch (Exception $e) {
            throw new RepositorioException($e->getMessage(), $e->getCode());
        }
    }

    function atualizar(PeriodoExibicao $periodo) {
        try {
            $preparedStatement = $this->pdo->prepare('UPDATE periodo_exibicao SET hora_inicio = :hora_inicio, hora_fim = :hora_fim WHERE id = :id');
            $preparedStatement->execute([
                'hora_inicio' => $periodo->horaInicio,
                'hora_fim' => $periodo->horaFim,
                'id' => $periodo->id
            ]);
            if ($preparedStatement->rowCount() < 1) {
                throw new RepositorioException('Período de exibição não encontrado.');
            }
            return $periodo->id;
        } catch (Exception $e) {
            throw new RepositorioException($e->getMessage(), $e->getCode());
        }
    }

    public function periodosExibicaoPorAviso($avisoId) {
        try {
            $preparedStatement = $this->pdo->prepare('SELECT pe.id, pe.descricao, pe.hora_inicio, pe.hora_fim  FROM periodo_exibicao pe JOIN periodo_exibicao_aviso pea ON pe.id = pea.periodo_exibicao_id WHERE pea.aviso_id = :aviso_id');
            $preparedStatement->execute([
                'aviso_id' => $avisoId
            ]);
            $linhas = $preparedStatement->fetchAll(PDO::FETCH_ASSOC);

            foreach($linhas as $periodo) {
                $array []= new PeriodoExibicao($periodo['id'], $periodo['descricao'], $periodo['hora_inicio'], $periodo['hora_fim']);
            }
            return $array;
        } catch (Exception $e) {
            throw new RepositorioException($e->getMessage(), $e->getCode());
        }
    }
}
?>