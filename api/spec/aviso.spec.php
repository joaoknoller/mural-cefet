<?php

use phputil\TDate;

require 'vendor/autoload.php';
require_once './app/model/aviso.php';
require_once './app/model/setor.php';
require_once './app/exception/modelo-exception.php';

describe( 'Validação dos avisos', function() {
    it('Deve criar um aviso corretamente', function() {
        $avisoValido = function() {
            $aviso = new Aviso(1, 'Mensagem válida', true, new TDate(), new Setor(0, '', ''), [1], [1]);
            $aviso->validar();
        };
        expect($avisoValido)->not->toThrow(new ModeloException());
    });
    
    it('Não deve ser possível criar aviso com id negativo', function() {
        $avisoInvalido = function() {
            $aviso = new Aviso(-1, 'Mensagem válida', true, new TDate(), new Setor(0, '', ''), [1], [1]);
            $aviso->validar();
        };
        expect($avisoInvalido)->toThrow(new ModeloException('Id deve ser um número inteiro e positivo.\n'));
    });
    
    it('Não deve ser possível criar aviso com mensagem vazia', function() {
        $avisoInvalido = function() {
            $aviso = new Aviso(1, '', true, new TDate(), new Setor(0, '', ''), [1], [1]);
            $aviso->validar();
        };
        expect($avisoInvalido)->toThrow(new ModeloException('Mensagem não deve ser vazia.\n'));
    });
    
    it('Não deve ser possível criar aviso com array de períodos de exibição vazio', function() {
        $avisoInvalido = function() {
            $aviso = new Aviso(1, 'Mensagem válida', true, new TDate(), new Setor(0, '', ''), [1], []);
            $aviso->validar();
        };
        expect($avisoInvalido)->toThrow(new ModeloException('O aviso deve ter pelo menos um período de exibição relacionado.\n'));
    });
    
    it('Não deve ser possível criar aviso com array de públicos-alvo vazio', function() {
        $avisoInvalido = function() {
            $aviso = new Aviso(1, 'Mensagem válida', true, new TDate(), new Setor(0, '', ''), [], [1]);
            $aviso->validar();
        };
        expect($avisoInvalido)->toThrow(new ModeloException('O aviso deve ter pelo menos um público-alvo relacionado.\n'));
    }); 
});

?>
