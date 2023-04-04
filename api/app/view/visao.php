<?php

use Psr\Http\Message\ResponseInterface as Response;

class Visao {
    public function escreverCabecalho(Response $resposta) {
        return $resposta
            ->withHeader('Content-Type', 'application/json')
            ->withHeader('Access-Control-Allow-Origin', 'http://localhost:1234');
    }

    public function escreverResposta(Response $resposta, $json) {
        $resposta->getBody()->write(json_encode($json));
        return $resposta;
    }

    public function escreverStatus(Response $resposta, int $codigoStatus) {
        return $resposta->withStatus($codigoStatus);
    }
  
    public function escreverErro(Response $resposta, $mensagem, int $status) {
        $resposta = $this->escreverCabecalho($resposta);
        $resposta = $this->escreverStatus($resposta, $status);
        $resposta = $this->escreverResposta($resposta, $mensagem);
        return $resposta;
    }
}

?>