import Setor from '../model/setor';

export default interface RepositorioSetor {
	/**
	 * Adiciona um setor
	 *
	 * @param { Setor } setor Setor a ser adicionado
	 * @throws { RepositorioError }
	 */
	adicionar(setor: Setor): Promise<boolean>;

	/**
	 * Retorna todos os setores
	 * @param { number } offset Paginação
	 * @return { Setor[] } Array de setores
	 * @throws { RepositorioError }
	 */
	todos(offset?: number): Promise<Setor[]>;

	/**
	 * Retorna setor com o id passado
	 * @return { Setor } Setor com id correspondente
	 * @throws { RepositorioError }
	 */
	porId(id: number): Promise<Setor>;
}
