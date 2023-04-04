<?php

use Psr\Http\Message\ResponseInterface as Response;

require_once './app/view/visao.php';

class VisaoUsuario extends Visao {

    public function escreverUsuariosRetornados(Response $resposta, $json) {
        $resposta = $this->escreverCabecalho($resposta);
        $resposta = $this->escreverResposta($resposta, $json);
        $resposta = $this->escreverStatus($resposta, 200);
        return $resposta;
    }
    
    public function escreverUsuarioCadastrado(Response $resposta, int $id) {
        $resposta = $this->escreverCabecalho($resposta);
        $resposta = $this->escreverResposta($resposta, $id);
        $resposta = $this->escreverStatus($resposta, 201);
        return $resposta;
    }

    public function validar($json) {
        $nome = htmlspecialchars($json['nome']);
        $login = htmlspecialchars($json['login']);
        $senha = htmlspecialchars($json['hashSenha']);
        return new Usuario(
            (isset($json['id']) ? $json['id'] : 0),
            $nome,
            $login,
            $senha
        );
    }
}

?>