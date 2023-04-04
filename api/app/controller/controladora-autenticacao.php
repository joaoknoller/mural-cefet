<?php

use Slim\App;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

require_once './app/view/visao-autenticacao.php';
require_once './app/exception/autenticacao-exception.php';
require_once './app/repository/repositorio-usuario-em-bdr.php';

class ControladoraAutenticacao {
    private $app;
    private $repositorioUsuario;
    private $visao;

    public function __construct(PDO $pdo, App $app) {
        $this->app = $app;
        $this->visao = new VisaoAutenticacao();
        $this->repositorioUsuario = new RepositorioUsuarioEmBDR($pdo);
    }

    public function executar() {
        $this->app->post('/autenticacao', function (Request $requisicao, Response $resposta, $args) {
            try {
                $credenciais = $this->visao->pegarCredenciais($requisicao->getBody());
                $nomeUsuario = $this->repositorioUsuario->verificarCredenciais($credenciais);
                
                $resposta = $this->visao->escreverUsuarioAutenticado($resposta, $nomeUsuario);
                return $resposta;
            } catch (AutenticacaoException $e) {
                $resposta = $this->visao->escreverErro($resposta, $e->getMessage(), 401);
                return $resposta->withHeader('Location', '/autenticacao');
            } catch (Exception $e) {
                $resposta = $this->visao->escreverErro($resposta, $e->getMessage(), 500);
                return $resposta;
            }
        });

        return $this->app;
    }
}

?>