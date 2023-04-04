<?php

require_once './app/model/modelo.php';

class PeriodoExibicao extends Modelo {
    public $id;
    public $descricao;
    public $horaInicio;
    public $horaFim;

    function __construct($id, $descricao, $horaInicio, $horaFim) {
        $this->id = $id;
        $this->setDescricao($descricao);
        $this->horaInicio = $horaInicio;
        $this->horaFim = $horaFim;
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