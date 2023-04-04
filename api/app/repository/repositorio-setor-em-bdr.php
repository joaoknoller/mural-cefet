<?php

require_once './app/model/setor.php';
require_once './app/repository/repositorio-setor.php';
require_once './app/exception/repositorio-exception.php';

class RepositorioSetorEmBDR implements RepositorioSetor {

    private $pdo = null;

    function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    function todos($offset = 1) {
        try {
            $preparedStatement = $this->pdo->prepare('SELECT id, nome, cor_em_hex FROM setor LIMIT 10 OFFSET ' . ($offset - 1) * 10);
            $preparedStatement->execute();
            $linhas = $preparedStatement->fetchAll(PDO::FETCH_ASSOC);

            if (empty($linhas)) {
                return [];
            }

            foreach($linhas as $s) {
                $setores []= new Setor(
                    $s['id'],
                    $s['nome'],
                    $s['cor_em_hex'],
                );
            }
            return $setores;
        } catch (Exception $e) {
            throw new RepositorioException($e->getMessage(), $e->getCode());
        }
    }

    function porId($id) {
        try {
            $preparedStatement = $this->pdo->prepare('SELECT id, nome, cor_em_hex FROM setor WHERE id = :id');
            $preparedStatement->setFetchMode(PDO::FETCH_ASSOC);
            $preparedStatement->execute([
                'id' => $id
            ]);
            if ($preparedStatement->rowCount() < 1) {
                throw new RepositorioException('Setor não encontrado.');
            }
            $setor = $preparedStatement->fetch();
            return new Setor($setor['id'], $setor['nome'], $setor['cor_em_hex']);
        } catch (Exception $e) {
            throw new RepositorioException($e->getMessage(), $e->getCode());
        }
    }

    function cadastrar(Setor $setor) {
        try {
            $ps = $this->pdo->prepare('INSERT INTO setor (nome, cor_em_hex) VALUES (:nome, :cor)');
            $ps->execute([
                'nome' => $setor->nome,
                'cor' => $setor->corEmHEX
            ]);
            $idRetornado = $this->pdo->lastInsertId();
            return $idRetornado;
        } catch (Exception $e) {
            throw new RepositorioException('Erro ao cadastrar setor.', $e->getCode(), $e);
        }
    }

    function alterar(Setor &$setor) {
        try {
            $ps = $this->pdo->prepare('UPDATE setor SET nome = :nome, cor_em_hex = :cor
            WHERE id = :id');
            $ps->execute(['nome' => $setor->nome, 
                        'cor' => $setor->corEmHEX, 
                        'id' => $setor->id]);
            if ($ps->rowCount() < 1) {
                throw new ModeloException('Setor não alterado.');
            }
        } catch (PDOException $e) {
            throw new RepositorioException('Erro ao alterar setor.', $e->getCode(), $e);
        }       
    }

    function excluir($id) {
        try {
            $ps = $this->pdo->prepare('DELETE FROM setor WHERE id = :id');
            $ps->execute(['id' => $id]);
        } catch (PDOException $e) {
            throw new RepositorioException('Erro ao excluir setor.', $e->getCode(), $e);
        }
    }

}
?>