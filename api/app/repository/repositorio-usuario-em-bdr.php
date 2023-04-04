<?php

require_once './app/repository/repositorio-usuario.php';
require_once './app/exception/repositorio-exception.php';
require_once './app/exception/autenticacao-exception.php';

class RepositorioUsuarioEmBDR implements RepositorioUsuario {
    private $pdo = null;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    function todos() {
        try {
            $preparedStatement = $this->pdo->prepare('SELECT id, nome, login, hash_senha FROM usuario');
            $preparedStatement->execute();
            $linhas = $preparedStatement->fetchAll(PDO::FETCH_ASSOC);
            if (empty($linhas)) {
                return [];
            }
            foreach($linhas as $usuario) {
                $array []= new Usuario(
                    $usuario['id'],
                    $usuario['nome'],
                    $usuario['login'],
                    $usuario['hash_senha']
                );
            }
            return $array;
        } catch (Exception $e) {
            throw new RepositorioException('Não foi possível consultar os usuários. ' . $e->getMessage());
        }
    }

    function cadastrar($usuario) {
        try {
            $preparedStatement = $this->pdo->prepare('INSERT INTO usuario (nome, login, hash_senha) VALUES (:nome, :login, :hash_senha)');
            $preparedStatement->execute([
                'nome' => $usuario->nome,
                'login' => $usuario->login,
                'hash_senha' => $usuario->hashSenha
            ]);
            $idRetornado = $this->pdo->lastInsertId();
            return $idRetornado;
        } catch (Exception $e) {
            throw new RepositorioException('Não foi possível cadastrar usuário. ' . $e->getMessage());
        }
    }

    function verificarCredenciais($credenciais) {
        try {
            $preparedStatement = $this->pdo->prepare('SELECT id, nome FROM usuario WHERE login = :login AND hash_senha = :hash_senha');
            $preparedStatement->execute([
                'login' => $credenciais->login,
                'hash_senha' => $credenciais->senha
            ]);
            if ($preparedStatement->rowCount() < 1) {
                throw new Exception();
            }
            $usuario = $preparedStatement->fetch();
            return $usuario['nome'];
        } catch (Exception $e) {
            throw new AutenticacaoException('Credenciais invalidas, por favor tente novamente.');
        }
    }
}

?>