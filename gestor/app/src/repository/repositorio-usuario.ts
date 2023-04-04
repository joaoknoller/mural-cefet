import Usuario from '../model/usuario';

export default interface RepositorioUsuario {
	/**
	 * Adiciona um usuario
	 *
	 * @param { Usuario } usuario Usuario a ser adicionado
	 * @throws { RepositorioError }
	 */
	adicionar(usuario: Usuario): Promise<boolean>;

	/**
	 * Retorna todos os usuarios
	 * @return { [] } Array
	 * @throws { ServicoException }
	 */
	todos(): Promise<any[]>;

	/**
	 * Retorna nome do usuário, caso autenticado corretamente
	 * @param { Object } dados Credenciais do usuário
	 * @return { string } Nome do usuário
	 * @throws { RepositorioException }
	 */
	autenticar(dados: Object): Promise<any>;
}
