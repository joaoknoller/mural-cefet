<?php

use phputil\TDate;

require_once './app/model/aviso.php';
require_once './app/model/setor.php';
require_once './app/repository/repositorio-aviso-em-bdr.php';
require_once './app/repository/repositorio-setor-em-bdr.php';
require_once './app/repository/repositorio-publico-alvo-em-bdr.php';
require_once './app/repository/repositorio-periodo-exibicao-em-bdr.php';
require_once './app/exception/servico-exception.php';

class ServicoAviso {
    private $repositorioAviso;
    private $repositorioSetor;
    private $repositorioPublicoAlvo;
    private $repositorioPeriodoExibicao;

    public function __construct($repositorioAviso, $repositorioSetor, $repositorioPublicoAlvo, $repositorioPeriodoExibicao) {
        $this->repositorioAviso = $repositorioAviso;
        $this->repositorioSetor = $repositorioSetor;
        $this->repositorioPublicoAlvo = $repositorioPublicoAlvo;
        $this->repositorioPeriodoExibicao = $repositorioPeriodoExibicao;
    }

    public function cadastrar($dadosAviso) {
        try {
            $aviso = $this->montarAviso($dadosAviso);
            $aviso->validar();
            foreach ($aviso->periodosExibicao as $pe) {
                $periodosExibicaoIds []= $pe->id;
            }
            foreach ($aviso->publicosAlvo as $pa) {
                $publicosAlvoIds []= $pa->id;
            }
            $id = $this->repositorioAviso->cadastrar($aviso, $periodosExibicaoIds, $publicosAlvoIds);
            return $id;
        } catch (Exception $e) {
            throw new ModeloException('Houve uma inconsistência nos dados. Favor consultar documentação. \n' . $e->getMessage());
        }
    }

    public function montarAviso($aviso) {
        $publicosAlvo = [];
        $periodosExibicao = [];
        $publicosAlvoIds = $aviso['publicosAlvoIds'];
        $periodosExibicaoIds = $aviso['periodosExibicaoIds'];

        foreach($publicosAlvoIds as $pa) {
            $publicosAlvo []= $this->repositorioPublicoAlvo->porId($pa);
        }

        foreach($periodosExibicaoIds as $pe) {
            $periodosExibicao []= $this->repositorioPeriodoExibicao->porId($pe);
        }

        try {
            $aviso = new Aviso(
                isset($aviso['id']) ? $aviso['id'] : 0,
                $aviso['mensagem'],
                $aviso['ehUrgente'],
                new TDate($aviso['validade']),
                $this->repositorioSetor->porId($aviso['setorId']),
                $publicosAlvo,
                $periodosExibicao
            );
            return $aviso;
        } catch (Exception $e) {
            throw new ModeloException('Houve uma inconsistência nos dados. Favor consultar documentação. \n' . $e->getMessage());
        }
    }

    public function alterar($dadosAviso) {
        try {
            $aviso = $this->montarAviso($dadosAviso);
            $aviso->validar();
            foreach ($aviso->periodosExibicao as $pe) {
                $periodosExibicaoIds []= $pe->id;
            }
            foreach ($aviso->publicosAlvo as $pa) {
                $publicosAlvoIds []= $pa->id;
            }
            $this->repositorioAviso->alterar($aviso, $periodosExibicaoIds, $publicosAlvoIds);
            return $aviso->id;
        } catch (Exception $e) {
            throw new ModeloException('Houve uma inconsistência nos dados. Favor consultar documentação. \n' . $e->getMessage());
        }
    }

    public function clonarAviso($dadosAviso) {
        try {
            $aviso = $this->montarAviso($dadosAviso);
            $aviso->validar();
            foreach ($aviso->periodosExibicao as $pe) {
                $periodosExibicaoIds []= $pe->id;
            }
            foreach ($aviso->publicosAlvo as $pa) {
                $publicosAlvoIds []= $pa->id;
            }
            $id = $this->repositorioAviso->clonarAviso($aviso, $periodosExibicaoIds, $publicosAlvoIds);
            return $id;
        } catch (Exception $e) {
            throw new ModeloException('Houve uma inconsistência nos dados. Favor consultar documentação. \n' . $e->getMessage());
        }
    }
}
