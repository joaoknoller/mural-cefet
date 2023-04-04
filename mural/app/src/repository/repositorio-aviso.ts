export interface RepositorioAviso {
	/**
	 * Retorna todos os avisos
	 * @return { any[] }
	 * @throws { ModeloError }
	 */
	todos(): Promise<any[]>;
}
