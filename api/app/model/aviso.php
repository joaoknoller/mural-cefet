<?php

require_once './app/exception/modelo-exception.php';
require_once './app/model/modelo.php';

class Aviso extends Modelo {
    public $id;
    public $mensagem;
    public $ehUrgente;
    public $setor;
    public $periodosExibicao;
    public $publicosAlvo;
    public $validade;

    function __construct($id, $mensagem, $ehUrgente, $validade, $setor, $publicosAlvo = null, $periodosExibicao = null) {
        $this->setId($id);
        $this->setMensagem($mensagem);
        $this->setEhUrgente($ehUrgente);
        $this->validade = $validade;
        $this->setor = $setor;
        $this->setPeriodosExibicao($periodosExibicao);
        $this->setPublicosAlvo($publicosAlvo);
    }

    function setId($id) {
        if ($id < 0) {
            $this->mensagensErro .= 'Id deve ser um número inteiro e positivo.\n';
        } else {
            $this->id = $id;
        }
    }
    
    function setMensagem($mensagem) {
        if (mb_strlen($mensagem) <= 0) {
            $this->mensagensErro .= 'Mensagem não deve ser vazia.\n';
        } else {
            $this->mensagem = $mensagem;
        }
    }
    
    function setEhUrgente($ehUrgente) {
        $this->ehUrgente = boolval($ehUrgente);
    }

    function setPeriodosExibicao($periodosExibicao) {
        if (count($periodosExibicao) <= 0) {
            $this->mensagensErro .= 'O aviso deve ter pelo menos um período de exibição relacionado.\n';
        } else {
            $this->periodosExibicao = $periodosExibicao;
        }
    }
    
    function setPublicosAlvo($publicosAlvo) {
        if (count($publicosAlvo) <= 0) {
            $this->mensagensErro .= 'O aviso deve ter pelo menos um público-alvo relacionado.\n';
        } else {
            $this->publicosAlvo = $publicosAlvo;
        }
    }

    function validoAte() {
        return $this->validade->dateString();
    }
}

?>