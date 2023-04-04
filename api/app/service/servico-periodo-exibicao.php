<?php

require_once './app/model/periodo-exibicao.php';
require_once './app/repository/repositorio-periodo-exibicao-em-bdr.php';
require_once './app/exception/servico-exception.php';

class ServicoPeriodoExibicao {
    private $repositorio;

    public function __construct($repositorio) {
        $this->repositorio = $repositorio;
    }

    public function atualizar($id, $json) {
        try {
            $periodo = $this->repositorio->porId($id);
            $periodo->horaInicio = $json['horaInicio'];
            $periodo->horaFim = $json['horaFim'];
            $idRetornado = $this->repositorio->atualizar($periodo);
            return $idRetornado;
        } catch (Exception $e) {
            throw new ServicoException('Não foi possível atualizar período de exibição. ' . $e->getMessage());
        }
    }
}
