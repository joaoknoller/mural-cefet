<?php

interface RepositorioUsuario {

    /**
     * Retorna todos os usuarios
     * @return Array
     */
    function todos();

    /**
     * Cadastra um usuario
     * @param Usuario $usuario Usuario a ser cadastrado
     * @return int id do usuario cadastrado
     */
    function cadastrar($usuario);
}

?>