<?php

require 'vendor/autoload.php';
require_once './app/model/publico-alvo.php';
require_once './app/exception/modelo-exception.php';

describe( 'Validação do público alvo', function() {
    it('Deve criar um público alvo corretamente', function() {
        $publicovalido = function() {
            $publicoAlvo = new PublicoAlvo(1, 'Descrição válida');
            $publicoAlvo->validar();
        };
        expect($publicovalido)->not->toThrow(new ModeloException());
    });
    
    it('Não deve ser possível criar público alvo com descrição vazia', function() {
        $publicoInvalido = function() {
            $publicoAlvo = new PublicoAlvo(1, '');
            $publicoAlvo->validar();
        };
        expect($publicoInvalido)->toThrow(new ModeloException());
    });
});

?>
