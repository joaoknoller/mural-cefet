<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\StreamInterface;

require_once './app/view/visao.php';

class VisaoPeriodoExibicao extends Visao {
    public function escreverPeriodosExibicaoRetornados(Response $resposta, $json) {
        $resposta = $this->escreverCabecalho($resposta);
        $resposta = $this->escreverResposta($resposta, $json);
        $resposta = $this->escreverStatus($resposta, 200);
        return $resposta;
    }
    
    public function escreverPeriodoExibicaoCadastrado(Response $resposta, int $id) {
        $resposta = $this->escreverCabecalho($resposta);
        $resposta = $this->escreverResposta($resposta, $id);
        $resposta = $this->escreverStatus($resposta, 201);
        return $resposta;
    }
}

?>