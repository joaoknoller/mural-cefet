<?php

require 'vendor/autoload.php';
require_once './app/model/setor.php';
require_once './app/exception/modelo-exception.php';

describe( 'Validação dos setores', function() {
    it('Deve criar um setor corretamente', function() {
        $setorValido = function() {
            $setor = new Setor(1, 'Setor válido', '#FFFFFF');
            $setor->validar();
        };
        expect($setorValido)->not->toThrow(new ModeloException());
    });

    it('Não deve ser possível criar setor com id negativo', function() {
        $setorInvalido = function() {
            $setor = new Setor(-1, 'Setor válido', '#FFFFFF');
            $setor->validar();
        };
        expect($setorInvalido)->toThrow(new ModeloException());
    });

    it('Não deve ser possível criar setor com nome vazio', function() {
        $setorInvalido = function() {
            $setor = new Setor(1, '', '#FFFFFF');
            $setor->validar();
        };
        expect($setorInvalido)->toThrow(new ModeloException());
    });

    it('Não deve ser possível criar setor com cor de tamanho diferente do padrão', function() {
        $setorInvalido = function() {
            $setor = new Setor(1, 'Setor válido', '#FFFFF');
            $setor->validar();
        };
        expect($setorInvalido)->toThrow(new ModeloException());
    });
});

?>
