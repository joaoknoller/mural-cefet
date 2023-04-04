import PeriodoExibicao from '../model/periodo-exibicao';

export default interface RepositorioPeriodoExibicao {
	/**
	 * Retorna todos os períodos de exibição
	 * @return { PeriodoExibicao[] } Array de períodos de exibição
	 * @throws { RepositorioError }
	 */
	todos(): Promise<PeriodoExibicao[]>;

	/**
	 * Retorna período de exibição com o id passado
	 * @return { PeriodoExibicao } Período de exibição com id correspondente
	 * @throws { RepositorioError }
	 */
	porId(id: number): Promise<PeriodoExibicao>;

	/**
	 * Atualiza dados do período de exibição passado
	 * @return { PeriodoExibicao } Período de exibição com id correspondente
	 * @throws { RepositorioError }
	 */
	atualizar(periodo: PeriodoExibicao): Promise<any>;
}
