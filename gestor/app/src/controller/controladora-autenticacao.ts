import HTTP from '../connection/http';
import HTTPReal from '../connection/http-real';
import RepositorioUsuario from '../repository/repositorio-usuario';
import RepositorioUsuarioEmBDR from '../repository/repositorio-usuario-em-bdr';
import VisaoAutenticacao from '../view/visao-autenticacao';

export default class ControladoraAutenticacao {
	http: HTTP;
	repositorioUsuario: RepositorioUsuario;
	visao: VisaoAutenticacao;

	constructor() {
		this.http = new HTTPReal();
		this.repositorioUsuario = new RepositorioUsuarioEmBDR(this.http);
		this.visao = new VisaoAutenticacao();
	}

	async executar(): Promise<any> {
		try {
			this.visao.aoLogar(this.autenticar);
		} catch (error) {
			this.visao.exibirErros((error as Error).message);
		}
	}

	autenticar = async (dados: Object) => {
		try {
			const nomeUsuario = await this.repositorioUsuario.autenticar(dados);
			this.visao.exibirSucesso(nomeUsuario.nome);
		} catch (error) {
			this.visao.exibirErros((error as Error).message);
		}
	};
}
