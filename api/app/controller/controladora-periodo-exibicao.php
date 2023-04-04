<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;

require_once './app/repository/repositorio-periodo-exibicao-em-bdr.php';
require_once './app/model/periodo-exibicao.php';
require_once './app/service/servico-periodo-exibicao.php';
require_once './app/view/visao-periodo-exibicao.php';

class ControladoraPeriodoExibicao {
    private $repositorio;
    private $servico;
    private $visao;
    private $app;

    function __construct(PDO $pdo, App $app) {
        $this->repositorio = new RepositorioPeriodoExibicaoEmBDR($pdo);
        $this->servico = new ServicoPeriodoExibicao($this->repositorio);
        $this->visao = new VisaoPeriodoExibicao();
        $this->app = $app;
    }

    public function executar() {
        $this->app->get('/periodos-exibicao', function (Request $requisicao, Response $resposta, $args) {
            try {
                $periodosExibicao = $this->repositorio->todos();
                $resposta = $this->visao->escreverPeriodosExibicaoRetornados($resposta, $periodosExibicao);
                return $resposta;
            } catch (RepositorioException $e) {
                $resposta = $this->visao->escreverErro($resposta, $e->getMessage(), 500);
                return $resposta;
            } catch (Exception $e) {
                $resposta = $this->visao->escreverErro($resposta, $e->getMessage(), 400);
                return $resposta;
            }     
        });

        $this->app->get('/periodos-exibicao/{id}', function (Request $requisicao, Response $resposta, $args) {
            try {
                $setor = $this->repositorio->porId($args['id']);
                $resposta = $this->visao->escreverPeriodosExibicaoRetornados($resposta, $setor);
                return $resposta;
            } catch (RepositorioException $e) {
                $resposta = $this->visao->escreverErro($resposta, $e->getMessage(), 500);
                return $resposta;
            } catch (Exception $e) {
                $resposta = $this->visao->escreverErro($resposta, $e->getMessage(), 400);
                return $resposta;
            }     
        });

        $this->app->put('/periodos-exibicao/{id}', function (Request $requisicao, Response $resposta, $args) {
            try {
                $json = json_decode($requisicao->getBody(), true);
                $id = $this->servico->atualizar($args['id'], $json);
                $resposta = $this->visao->escreverPeriodoExibicaoCadastrado($resposta, $id);
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