import Aviso from '../model/aviso';

export default interface RepositorioAviso {
	/**
	 * Adiciona um aviso
	 *
	 * @param { any } aviso Aviso a ser adicionado
	 * @throws { RepositorioError }
	 */
	adicionar(aviso: any): Promise<boolean>;

	/**
	 * Retorna todos os avisos
	 * @param { number } offset Paginação
	 * @return { [] } Array
	 * @throws { ServicoException }
	 */
	todos(offset?: number): Promise<any[]>;

	/**
	 * Retorna aviso com id passado por parâmetro
	 * @param { number } id Id do aviso a ser consultado
	 * @return { Aviso } Aviso com id correspondente
	 * @throws { RepositorioAviso }
	 */
	porId(id: number): Promise<any>;

	/**
	 * Exclui um aviso
	 * @param { number } id Id do aviso a ser excluído
	 * @return { boolean } Booleano indicando se foi excluído
	 * @throws { RepositorioAviso }
	 */
	remover(id: number): Promise<boolean>;

	/**
	 * Altera um aviso
	 *
	 * @param { any } aviso Aviso a ser alterado
	 * @throws { RepositorioError }
	 */
	alterar(aviso: any): Promise<boolean>;
}
