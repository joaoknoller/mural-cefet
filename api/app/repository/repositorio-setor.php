<?php

interface RepositorioSetor {

    /**
     * Retorna todos os setores
     * @return array Setores
     * @throws RepositorioException
     */
    function todos();

    /**
     * Retorna setor com o id passado por parâmetro, caso exista
     * @param int $id id do setor desejado
     * @return Setor
     */
    function porId($id);

    /**
     * Cadastra um setor
     * @param Setor &$setor Setor a ser cadastrado
     * @return int id do setor cadastrado
     * @throws RepositorioException
     */
    function cadastrar(Setor $setor);

    /**
     * Altera um setor
     * @param Setor &$setor Setor a ser alterado
     * @throws RepositorioException
     */
    function alterar(Setor &$setor);

    /**
     * Exclui um setor
     * @param $id Id do setor a ser excluído
     * @throws RepositorioException
     */
    function excluir($id);
}

?>