<?php

use Slim\App;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

require_once './app/model/aviso.php';
require_once './app/view/visao-aviso.php';
require_once './app/repository/repositorio-aviso-em-bdr.php';
require_once './app/repository/repositorio-setor-em-bdr.php';
require_once './app/repository/repositorio-publico-alvo-em-bdr.php';
require_once './app/repository/repositorio-periodo-exibicao-em-bdr.php';
require_once './app/service/servico-aviso.php';
class ControladoraAviso {
    private $repositorioAviso;
    private $repositorioSetor;
    private $repositorioPublicoAlvo;
    private $repositorioPeriodoExibicao;
    private $visao;
    private $app;
    private $servico;

    public function __construct(PDO $pdo, App $app) {
        $this->repositorioSetor = new RepositorioSetorEmBDR($pdo);
        $this->repositorioPublicoAlvo = new RepositorioPublicoAlvoEmBDR($pdo);
        $this->repositorioPeriodoExibicao = new RepositorioPeriodoExibicaoEmBDR($pdo);
        $this->visao = new VisaoAviso();
        $this->app = $app;
        $this->repositorioAviso = new RepositorioAvisoEmBDR($pdo, $this->repositorioSetor, $this->repositorioPublicoAlvo, $this->repositorioPeriodoExibicao);
        $this->servico = new ServicoAviso($this->repositorioAviso, $this->repositorioSetor, $this->repositorioPublicoAlvo, $this->repositorioPeriodoExibicao);
    }

    public function executar() {
        $this->app->get('/avisos', function (Request $requisicao, Response $resposta, $args) {
            try {
                $parametros = $this->visao->pegarParametros($requisicao);
                if (isset($parametros['validos'])) $avisos = $this->repositorioAviso->todosValidos();
                else $avisos = $this->repositorioAviso->todos($parametros['offset']);
                $resposta = $this->visao->escreverAvisosRetornados($resposta, $avisos);
                return $resposta;
            } catch (RepositorioException $e) {
                $resposta = $this->visao->escreverErro($resposta, $e->getMessage(), 500);
                return $resposta;
            } catch (Exception $e) {
                $resposta = $this->visao->escreverErro($resposta, $e->getMessage(), 400);
                return $resposta;
            }
        });

        $this->app->get('/avisos/{id}', function (Request $requisicao, Response $resposta, $args) {
            try {
                $aviso = $this->repositorioAviso->porId($args['id']);
                $resposta = $this->visao->escreverAvisosRetornados($resposta, $aviso);
                return $resposta;
            } catch (RepositorioException $e) {
                $resposta = $this->visao->escreverErro($resposta, $e->getMessage(), 500);
                return $resposta;
            } catch (Exception $e) {
                $resposta = $this->visao->escreverErro($resposta, $e->getMessage(), 400);
                return $resposta;
            }     
        });

        $this->app->post('/avisos', function (Request $requisicao, Response $resposta, $args) {
            try {
                $json = json_decode($requisicao->getBody(), true);
                $id = $this->servico->cadastrar($json);
                $resposta = $this->visao->escreverAvisoCadastrado($resposta, $id);
                return $resposta;
            } catch (RepositorioException $e) {
                $resposta = $this->visao->escreverErro($resposta, $e->getMessage(), 500);
                return $resposta;
            } catch (Exception $e) {
                $resposta = $this->visao->escreverErro($resposta, $e->getMessage(), 400);
                return $resposta;
            }
        });

        $this->app->delete('/avisos/{id}', function (Request $requisicao, Response $resposta, $args) {
            try {
                $id = $this->repositorioAviso->remover($args['id']);
                $resposta = $this->visao->escreverAvisoRemovido($resposta, $id);
                return $resposta;
            } catch (RepositorioException $e) {
                $resposta = $this->visao->escreverErro($resposta, $e->getMessage(), 500);
                return $resposta;
            } catch (Exception $e) {
                $resposta = $this->visao->escreverErro($resposta, $e->getMessage(), 400);
                return $resposta;
            }
        });

        $this->app->put('/avisos', function (Request $requisicao, Response $resposta, $args) {
            try {
                $json = json_decode($requisicao->getBody(), true);
                $id = $this->servico->alterar($json);
                $resposta = $this->visao->escreverAvisoAlterado($resposta, $id);
                return $resposta;
            } catch (RepositorioException $e) {
                $resposta = $this->visao->escreverErro($resposta, $e->getMessage(), 500);
                return $resposta;
            } catch (Exception $e) {
                $resposta = $this->visao->escreverErro($resposta, $e->getMessage(), 400);
                return $resposta;
            }
        });

        $this->app->post('/clonar-aviso', function (Request $requisicao, Response $resposta, $args) {
            try {
                $json = json_decode($requisicao->getBody(), true);
                $id = $this->servico->clonarAviso($json);
                $resposta = $this->visao->escreverAvisoCadastrado($resposta, $id);
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