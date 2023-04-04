<?php

require_once 'sessao.php';

const UM_DIA = 86400;

class SessaoEmArquivo implements Sessao {

    function iniciar() {
        session_name('SID');
        session_set_cookie_params(
            ['lifetime' => UM_DIA,
            'secure' => true,
            'httpOnly' => true
        ]);
        return session_start();
    }

    function destruir() {
        session_destroy();
    }

    function regerarId() {
        session_regenerate_id();
    }

    function obterValor($chave) {
        return isset($_SESSION[$chave]) ? $_SESSION[$chave] : null;
    }

    function definirValor($chave, $valor) {
        $_SESSION[$chave] = $valor;
    }

    function iniciada() {
        return session_status() === PHP_SESSION_ACTIVE;
    }
}

?>