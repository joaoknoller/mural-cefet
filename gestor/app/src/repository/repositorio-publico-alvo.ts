import PublicoAlvo from '../model/publico-alvo';

export default interface RepositorioPublicoAlvo {
	/**
	 * Adiciona um público alvo
	 *
	 * @param { PublicoAlvo } publicoAlvo - Público alvo a ser adicionado
	 * @throws { RepositorioError }
	 */
	adicionar(publicoAlvo: PublicoAlvo): Promise<boolean>;

	/**
	 * Retorna todos os públicos-alvo
	 * @return { [] } Array
	 * @throws { RepositorioError }
	 */
	todos(): Promise<any[]>;

	/**
	 * Retorna público alvo com o id passado
	 * @return { PublicoAlvo } Público alvo com id correspondente
	 * @throws { RepositorioError }
	 */
	porId(id: number): Promise<PublicoAlvo>;
}
