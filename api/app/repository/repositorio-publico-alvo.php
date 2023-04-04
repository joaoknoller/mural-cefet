<?php

require_once './app/model/publico-alvo.php';

interface RepositorioPublicoAlvo {
    /**
     * Retorna todos os públicos alvo
     * @return array
     */
    function todos();

    /**
     * Cadastra um público alvo
     * @param string $dadosPublicoAlvo descrição do público alvo
     * @return int $id id do público alvo cadastrado
     */
    function cadastrar($dadosPublicoAlvo);

    /**
     * Retorna público alvo com o id passado por parâmetro, caso exista
     * @param int $id id do público alvo desejado
     * @return PublicoAlvo
     */
    function porId($id);

    function publicosAlvoPorAviso($avisoId);
}

?>