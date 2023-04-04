<?php

use Psr\Http\Message\ResponseInterface as Response;

require_once './app/util/util.php';
require_once './app/view/visao.php';
require_once './app/exception/autenticacao-exception.php';

class VisaoAutenticacao extends Visao {
    public function escreverUsuarioAutenticado(Response $resposta, $nome) {
        $resposta = $this->escreverCabecalho($resposta);
        $resposta = $this->escreverResposta($resposta, [nome => $nome]);
        $resposta = $this->escreverStatus($resposta, 200);
        return $resposta;
    }

    public function pegarCredenciais($corpo) {
        $corpo = json_decode($corpo);
        if (empty($corpo->login) || empty($corpo->senha)) {
            throw new AutenticacaoException('Credenciais invalidas');
        }
        $corpo->senha = hashComSal($corpo->senha);
        return $corpo;
    }
}

?>