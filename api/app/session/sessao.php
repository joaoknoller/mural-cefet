<?php

interface Sessao {
    
    /**
     * Inicia uma sessão
     */
    function iniciar();

    /**
     * Destroi uma sessão
     */
    function destruir();

    /**
     * Regera o id da sessão
     */
    function regerarId();

    /**
     * Define o valor da sessão
     * @param String $chave chave que identifica a sessão
     * @param String $valor valor que será atribuído a sessão
     */
    function definirValor($chave, $valor);

    /**
     * Obtem o valor da sessão a partir da chave
     * @param String $chave chave que identifica a sessão
     */
    function obterValor($chave);

    /**
     * Verifica se a sessão está iniciada
     * @return boolean
     */
    function iniciada();
}

?>