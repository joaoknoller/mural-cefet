<?php

use Slim\Factory\AppFactory;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

require __DIR__ . '/vendor/autoload.php';
require_once './app/connection/conexao.php';
require_once './app/controller/controladora-aviso.php';
require_once './app/controller/controladora-setor.php';
require_once './app/controller/controladora-publico-alvo.php';
require_once './app/controller/controladora-periodo-exibicao.php';
require_once './app/controller/controladora-usuario.php';
require_once './app/controller/controladora-autenticacao.php';

$pdo = Conexao::getInstance();
$app = AppFactory::create();
$controladoraAviso = new ControladoraAviso($pdo, $app);
$controladoraSetor = new ControladoraSetor($pdo, $app);
$controladoraPublicoAlvo = new ControladoraPublicoAlvo($pdo, $app);
$controladoraPeriodoExibicao = new ControladoraPeriodoExibicao($pdo, $app);
$controladoraUsuario = new ControladoraUsuario($pdo, $app);
$controladoraAutenticacao = new ControladoraAutenticacao($pdo, $app);

$app->options('/{routes:.+}', function (Request $requisicao, Response $resposta, $args) {
    $resposta = $resposta
        ->withHeader('Access-Control-Allow-Origin', 'http://localhost:1234')
        ->withHeader('Access-Control-Allow-Credentials', 'true')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    return $resposta;
});

$app = $controladoraAviso->executar();
$app = $controladoraSetor->executar();
$app = $controladoraPublicoAlvo->executar();
$app = $controladoraPeriodoExibicao->executar();
$app = $controladoraUsuario->executar();
$app = $controladoraAutenticacao->executar();

$app->run();

?>
