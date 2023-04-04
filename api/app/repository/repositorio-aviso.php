<?php

require_once './app/model/aviso.php';

interface RepositorioAviso {
    /**
     * Retorna todos os avisos
     * @return Array
     */
    function todos();

    /**
     * Cadastra um aviso
     * @param Aviso $aviso Aviso a ser cadastrado
     * @param Array $periodosExibicaoIds Lista de ids
     *  dos períodos de exibição relacionados ao aviso a ser cadastrado
     * @param Array $publicosAlvoIds Lista de ids
     *  dos públicos-alvo relacionados ao aviso a ser cadastrado
     * @return int id do aviso cadastrado
     */
    function cadastrar(Aviso $aviso, $periodosExibicaoIds, $publicosAlvoIds);

    /**
     * Retorna aviso com o id passado por parâmetro, caso exista
     * @param int $id id do aviso desejado
     * @return array
     */
    function porId($id);

    /** 
     * Remove um aviso pelo id passado por parâmetro, caso exista
     * @param int $id id do aviso a ser removido
    */
    function remover($id);

    /**
     * Altera um aviso
     * @param Aviso $aviso Aviso a ser alterado
     * @param Array $periodosExibicaoIds Lista de ids
     *  dos períodos de exibição relacionados ao aviso a ser alterado
     * @param Array $publicosAlvoIds Lista de ids
     *  dos públicos-alvo relacionados ao aviso a ser alterado
     */
    function alterar(Aviso $aviso, $periodosExibicaoIds, $publicosAlvoIds);

    /**
     * Retorna todos os avisos válidos de acordo com a data de validade
     * @return Array $avisos Array de avisos
     */
    function todosValidos();

    /**
     * Clona um aviso
     * @param Aviso $aviso Aviso a ser clonado
     * @param Array $periodosExibicaoIds Lista de ids
     *  dos períodos de exibição relacionados ao aviso a ser clonado
     * @param Array $publicosAlvoIds Lista de ids
     *  dos públicos-alvo relacionados ao aviso a ser clonado
     * @return int id do novo aviso criado
     */
    function clonarAviso(Aviso $aviso, $periodosExibicaoIds, $publicosAlvoIds);
}

?>