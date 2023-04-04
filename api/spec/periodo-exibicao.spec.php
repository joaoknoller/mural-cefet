<?php

require 'vendor/autoload.php';
require_once './app/model/periodo-exibicao.php';
require_once './app/exception/modelo-exception.php';

describe( 'Validação do período de exibicao', function() {
    it('Deve criar um período de exibição corretamente', function() {
        $periodoValido = function() {
            $periodoExibicao = new PeriodoExibicao(1, 'Período válido', '12:00', '13:00');
            $periodoExibicao->validar();
        };
        expect($periodoValido)->not->toThrow(new ModeloException());
    });

    it('Não deve ser possível criar setor com descrição vazia', function() {
        $periodoInvalido = function() {
            $periodoExibicao = new PeriodoExibicao(1, '', '12:00', '13:00');
            $periodoExibicao->validar();
        };
        expect($periodoInvalido)->toThrow(new ModeloException());
    });
});

?>
