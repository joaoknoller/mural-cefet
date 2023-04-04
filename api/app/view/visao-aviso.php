<?php

use Psr\Http\Message\RequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

require_once './app/view/visao.php';

class VisaoAviso extends Visao {
    public function escreverAvisosRetornados(Response $resposta, $json) {
        $resposta = $this->escreverCabecalho($resposta);
        $resposta = $this->escreverResposta($resposta, $json);
        $resposta = $this->escreverStatus($resposta, 200);
        return $resposta;
    }
    
    public function escreverAvisoCadastrado(Response $resposta, int $id) {
        $resposta = $this->escreverCabecalho($resposta);
        $resposta = $this->escreverResposta($resposta, $id);
        $resposta = $this->escreverStatus($resposta, 201);
        return $resposta;
    }
    
    public function escreverAvisoRemovido(Response $resposta, int $id) {
        $resposta = $this->escreverCabecalho($resposta);
        $resposta = $this->escreverStatus($resposta, 204);
        $resposta = $this->escreverResposta($resposta, $id);
        return $resposta;
    }
    
    public function escreverAvisoAlterado(Response $resposta, int $id) {
        $resposta = $this->escreverCabecalho($resposta);
        $resposta = $this->escreverStatus($resposta, 200);
        $resposta = $this->escreverResposta($resposta, $id);
        return $resposta;
    }

    public function pegarParametros(Request $requisicao) {
        $req = $requisicao->getQueryParams();
        if (isset($req['offset'])) {
            $array['offset'] = $req['offset'];
        } else {
            $array['offset'] = 1;
        }
        if (isset($req['validos'])) $array['validos'] = $req['validos'];

        return $array;
    }
}
