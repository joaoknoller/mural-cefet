<?php

use Slim\App;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

require_once './app/model/publico-alvo.php';
require_once './app/view/visao-publico-alvo.php';
require_once './app/repository/repositorio-publico-alvo-em-bdr.php';
class ControladoraPublicoAlvo {
    private $repositorio;
    private $visao;
    private $app;

    public function __construct(PDO $pdo, App $app) {
        $this->repositorio = new RepositorioPublicoAlvoEmBDR($pdo);
        $this->visao = new VisaoPublicoAlvo();
        $this->app = $app;
    }

    public function executar() {
        $this->app->get('/publicos-alvo', function (Request $requisicao, Response $resposta, $args) {
            try {
                $publicosAlvo = $this->repositorio->todos();
                $resposta = $this->visao->escreverPublicosAlvoRetornados($resposta, $publicosAlvo);
                return $resposta;
            } catch (RepositorioException $e) {
                $resposta = $this->visao->escreverErro($resposta, $e->getMessage(), 500);
                return $resposta;
            } catch (Exception $e) {
                $resposta = $this->visao->escreverErro($resposta, $e->getMessage(), 400);
                return $resposta;
            }
        });

        $this->app->get('/publicos-alvo/{id}', function (Request $requisicao, Response $resposta, $args) {
            try {
                $publicoAlvo = $this->repositorio->porId($args['id']);
                $resposta = $this->visao->escreverPublicosAlvoRetornados($resposta, $publicoAlvo);
                return $resposta;
            } catch (RepositorioException $e) {
                $resposta = $this->visao->escreverErro($resposta, $e->getMessage(), 500);
                return $resposta;
            } catch (Exception $e) {
                $resposta = $this->visao->escreverErro($resposta, $e->getMessage(), 400);
                return $resposta;
            }     
        });

        $this->app->post('/publicos-alvo', function (Request $requisicao, Response $resposta, $args) {
            try {
                $json = json_decode($requisicao->getBody(), true);
                $this->visao->validar($json);
                $id = $this->repositorio->cadastrar($json);
                $resposta = $this->visao->escreverPublicosAlvoCadastrado($resposta, $id);
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