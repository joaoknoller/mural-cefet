<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;

require_once './app/repository/repositorio-setor-em-bdr.php';
require_once './app/model/setor.php';
require_once './app/view/visao-setor.php';

class ControladoraSetor {
    private $repositorio;
    private $visao;
    private $app;

    function __construct(PDO $pdo, App $app) {
        $this->repositorio = new RepositorioSetorEmBDR($pdo);
        $this->visao = new VisaoSetor();
        $this->app = $app;
    }

    public function executar() {
        $this->app->get('/setores', function (Request $requisicao, Response $resposta, $args) {
            try {
                $parametros = $this->visao->pegarParametros($requisicao);
                $setores = $this->repositorio->todos($parametros['offset']);
                $resposta = $this->visao->escreverSetoresRetornados($resposta, $setores);
                return $resposta;
            } catch (RepositorioException $e) {
                $resposta = $this->visao->escreverErro($resposta, $e->getMessage(), 500);
                return $resposta;
            } catch (Exception $e) {
                $resposta = $this->visao->escreverErro($resposta, $e->getMessage(), 400);
                return $resposta;
            }     
        });

        $this->app->get('/setores/{id}', function (Request $requisicao, Response $resposta, $args) {
            try {
                $setor = $this->repositorio->porId($args['id']);
                $resposta = $this->visao->escreverSetoresRetornados($resposta, $setor);
                return $resposta;
            } catch (RepositorioException $e) {
                $resposta = $this->visao->escreverErro($resposta, $e->getMessage(), 500);
                return $resposta;
            } catch (Exception $e) {
                $resposta = $this->visao->escreverErro($resposta, $e->getMessage(), 400);
                return $resposta;
            }     
        });

        $this->app->post('/setores', function (Request $requisicao, Response $resposta, $args) {
            try {
                $setor = $this->visao->montarSetor($requisicao->getBody());
                $id = $this->repositorio->cadastrar($setor);
                $resposta = $this->visao->escreverSetorCadastrado($resposta, $id);
                return $resposta;
            } catch (RepositorioException $e) {
                $resposta = $this->visao->escreverErro($resposta, $e->getMessage(), 500);
                return $resposta;
            } catch (Exception $e) {
                $resposta = $this->visao->escreverErro($resposta, $e->getMessage(), 400);
                return $resposta;
            }
        });

        $this->app->put('/setores/{id}', function (Request $requisicao, Response $resposta, $args) {
            try {
                $dado = json_decode($requisicao->getBody(), true);
                $setor = new Setor(
                    htmlspecialchars($args['id']),
                    htmlspecialchars($dado['nome']),
                    htmlspecialchars($dado['cor'])
                );
                $this->repositorio->alterar($setor);
                $resposta =  $this->visao->escreverSetorAlterado($resposta);
                return $resposta;
            } catch (RepositorioException $e) {
                $resposta = $this->visao->escreverErro($resposta, $e->getMessage(), 500);
                return $resposta;
            } catch (Exception $e) {
                $resposta = $this->visao->escreverErro($resposta, $e->getMessage(), 400);
                return $resposta;
            }
        });

        $this->app->delete('/setores/{id}', function (Request $requisicao, Response $resposta, $args) {
            try {
                $id = htmlspecialchars($args['id']);
                $this->repositorio->excluir($id);
                $resposta = $this->visao->escreverSetorExcluido($resposta);
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