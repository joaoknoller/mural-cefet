<?php

class Modelo {
    public $mensagensErro = '';

    function validar() {
        if (mb_strlen($this->mensagensErro)) {
            throw new ModeloException($this->mensagensErro);
        }
    }
}

?>