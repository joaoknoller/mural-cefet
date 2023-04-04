<?php

require 'vendor/autoload.php';
require_once './app/model/usuario.php';
require_once './app/exception/modelo-exception.php';

describe( 'Validação dos usuários', function () {
    it('Deve criar um usuário corretamente', function () {
        $usuarioValido = function () {
            $usuario = new Usuario(1, 'Admin', '4dm1n', '123456');
            $usuario->validar();
        };
        expect($usuarioValido)->not->toThrow(new ModeloException());
    });

    it('Não deve ser possível criar usuário com id negativo', function () {
        $usuarioInvalido = function () {
            $usuario = new Usuario(-1, 'Admin', '4dm1n', '123456');
            $usuario->validar();
        };
        expect($usuarioInvalido)->toThrow(new ModeloException());
    });

    it('Não deve ser possível criar usuário com nome vazio', function () {
        $usuarioInvalido = function () {
            $usuario = new Usuario(1, '', '4dm1n', '123456');
            $usuario->validar();
        };
        expect($usuarioInvalido)->toThrow(new ModeloException());
    });

    it('Não deve ser possível criar usuário com login vazio', function () {
        $usuarioInvalido = function () {
            $usuario = new Usuario(1, 'Admin', '', '123456');
            $usuario->validar();
        };
        expect($usuarioInvalido)->toThrow(new ModeloException());
    });

    it('Não deve ser possível criar usuário com a senha vazia', function () {
        $usuarioInvalido = function () {
            $usuario = new Usuario(1, 'Admin', '4dm1n', '');
            $usuario->validar();
        };
        expect($usuarioInvalido)->toThrow(new ModeloException());
    });
});

?>