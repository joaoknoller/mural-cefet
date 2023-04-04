<?php

interface RepositorioPeriodoExibicao {

    /**
     * Retorna todos os períodos de exibição
     * @return array Períodos
     * @throws RepositorioException
     */
    function todos();
    
    /**
     * Edita período de exibição com o id passado por parâmetro, caso exista
     * @param PeriodoExibicao $periodo Objeto do período de exibição desejado
     * @return int $id
     * @throws RepositorioException
     */
    function atualizar(PeriodoExibicao $periodo);

    function periodosExibicaoPorAviso($avisoId);
}

?>