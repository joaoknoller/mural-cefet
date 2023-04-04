<?php

require_once './app/exception/modelo-exception.php';
require_once './app/model/modelo.php';

class PublicoAlvo extends Modelo {
    public $id;
    public $descricao;

    function __construct($id, $descricao) {
        $this->setId($id);
        $this->setDescricao($descricao);
    }

    public function setId($id) {
        if ($id < 0) {
            $this->mensagensErro .= 'Id deve ser um número inteiro e positivo.\n'; 
        } else {
            $this->id = $id;
        }
    }

    public function setDescricao($descricao) {
        if (strlen($descricao) <= 0) {
            $this->mensagensErro .= 'Descrição não deve ser vazia.\n';
        } else {
            $this->descricao = $descricao;
        }
    }
}

?>