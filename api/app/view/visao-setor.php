<?php

use Psr\Http\Message\RequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\StreamInterface;

require_once './app/view/visao.php';

class VisaoSetor extends Visao {
    public function escreverSetoresRetornados(Response $resposta, $json) {
        $resposta = $this->escreverCabecalho($resposta);
        $resposta = $this->escreverResposta($resposta, $json);
        $resposta = $this->escreverStatus($resposta, 200);
        return $resposta;
    }
    
    public function escreverSetorCadastrado(Response $resposta, int $id) {
        $resposta = $this->escreverCabecalho($resposta);
        $resposta = $this->escreverResposta($resposta, $id);
        $resposta = $this->escreverStatus($resposta, 201);
        return $resposta;
    }

    public function escreverSetorAlterado(Response $resposta) {
        $resposta = $this->escreverCabecalho($resposta);
        $resposta = $this->escreverStatus($resposta, 200);
        return $resposta;
    }

    public function escreverSetorExcluido(Response $resposta) {
        $resposta = $this->escreverCabecalho($resposta);
        $resposta = $this->escreverStatus($resposta, 204);
        return $resposta;
    }

    public function montarSetor(StreamInterface $body) {
        $setor = json_decode($body, true);
        return new Setor(
            0,
            htmlspecialchars($setor['nome']),
            htmlspecialchars($setor['corEmHEX']),
        );
    }

    public function pegarParametros(Request $requisicao) {
        $req = $requisicao->getQueryParams();
        if (isset($req['offset'])) {
            $array['offset'] = $req['offset'];
        } else {
            $array['offset'] = 1;
        }

        return $array;
    }
}

?>