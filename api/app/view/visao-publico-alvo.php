<?php

use Psr\Http\Message\ResponseInterface as Response;

require_once './app/view/visao.php';

class VisaoPublicoAlvo extends Visao {
    public function escreverPublicosAlvoRetornados(Response $resposta, $json) {
        $resposta = $this->escreverCabecalho($resposta);
        $resposta = $this->escreverResposta($resposta, $json);
        $resposta = $this->escreverStatus($resposta, 200);
        return $resposta;
    }
    
    public function escreverPublicosAlvoCadastrado(Response $resposta, int $id) {
        $resposta = $this->escreverCabecalho($resposta);
        $resposta = $this->escreverResposta($resposta, $id);
        $resposta = $this->escreverStatus($resposta, 201);
        return $resposta;
    }

    public function validar($json) {
        return new PublicoAlvo(
            (isset($json['id']) ? $json['id'] : 1),
            $json['descricao']
        );
    }
}
