<?php

use Slim\App;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

require_once './app/model/usuario.php';
require_once './app/view/visao-usuario.php';
require_once './app/repository/repositorio-usuario-em-bdr.php';

class ControladoraUsuario {
    private $repositorioUsuario;
    private $visao;
    private $app;

    public function __construct(PDO $pdo, App $app) {
        $this->repositorioUsuario = new RepositorioUsuarioEmBDR($pdo);
        $this->visao = new VisaoUsuario();
        $this->app = $app;
    }

    public function executar() {
        $this->app->get('/usuarios', function (Request $requisicao, Response $resposta, $args) {
            try {
                $usuarios = $this->repositorioUsuario->todos();
                $resposta = $this->visao->escreverUsuariosRetornados($resposta, $usuarios);
                return $resposta;
            } catch (RepositorioException $e) {
                $resposta = $this->visao->escreverErro($resposta, $e->getMessage(), 500);
                return $resposta;
            } catch (Exception $e) {
                $resposta = $this->visao->escreverErro($resposta, $e->getMessage(), 400);
                return $resposta;
            }
        });

        $this->app->post('/usuarios', function (Request $requisicao, Response $resposta, $args) {
            try {
                $json = json_decode($requisicao->getBody(), true);
                $usuario = $this->visao->validar($json);
                $id = $this->repositorioUsuario->cadastrar($usuario);
                $resposta = $this->visao->escreverUsuarioCadastrado($resposta, $id);
                return $resposta;
            } catch (RepositorioException $e) {
                $resposta = $this->visao->escreverErro($resposta, $e->getMessage(), 500);
                return $resposta;
            } catch (Exception $e) {
                $resposta = $this->visao->escreverErro($resposta, $e->getMessage(), 400);
                return $resposta;
            }
        });

        return $this->app;
    }
}

?>