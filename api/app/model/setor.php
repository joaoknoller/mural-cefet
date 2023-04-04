<?php

require_once './app/exception/modelo-exception.php';
require_once './app/model/modelo.php';

class Setor extends Modelo {
    public $id;
    public $nome;
    public $corEmHEX;

    function __construct($id, $nome, $corEmHEX) {
        $this->setId($id);
        $this->setNome($nome);
        $this->setCorEmHEX($corEmHEX);
    }

    function setId($id) {
        if ($id < 0) {
            $this->mensagensErro .= 'Id deve ser um número inteiro e positivo.\n';
        } else {
            $this->id = $id;
        }
    }

    function setNome($nome) {
        if (strlen($nome) <= 0) {
            $this->mensagensErro .= 'Mensagem não deve ser vazia.\n';
        } else {
            $this->nome = $nome;
        }
    }
    
    function setCorEmHEX($corEmHEX) {
        if (strlen($corEmHEX) != 7) {
            $this->mensagensErro .= 'Cor deve estar no padrão hexadecimal. Ex.: #FFFFFF.\n';
        } else {
            $this->corEmHEX = $corEmHEX;
        }
    }
}

?>