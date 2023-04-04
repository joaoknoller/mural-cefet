<?php

require_once './app/exception/modelo-exception.php';
require_once './app/model/modelo.php';
require_once './app/util/util.php';

class Usuario extends Modelo {
    public $id;
    public $nome;
    public $login;
    public $hashSenha;

    function __construct($id, $nome, $login, $hashSenha) {
        $this->setId($id);
        $this->setNome($nome);
        $this->setLogin($login);
        $this->setHashSenha($hashSenha);
    }

    function setId($id) {
        if ($id < 0) {
            $this->mensagensErro .= 'Id deve ser um número inteiro e positivo.\n';
        } else {
            $this->id = $id;
        }
    }

    function setNome($nome) {
        if (mb_strlen($nome) <= 0) {
            $this->mensagensErro .= 'Nome não deve ser vazio.\n';
        } else {
            $this->nome = $nome;
        }
    }

    function setLogin($login) {
        if (mb_strlen($login) <= 0) {
            $this->mensagensErro .= 'Login não deve ser vazio.\n';
        } else {
            $this->login = $login;
        }
    }

    function setHashSenha($hashSenha) {
        if (mb_strlen($hashSenha) <= 0) {
            $this->mensagensErro .= 'A senha não deve ser vazia.\n';
        } else {
            $this->hashSenha = hashComSal($hashSenha);
        }
    }
}
?>