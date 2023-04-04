import HTTP from '../connection/http';
import HTTPReal from '../connection/http-real';
import { MENSAGENS } from '../util/constantes';
import RepositorioPublicoAlvoEmBDR from '../repository/repositorio-publico-alvo-em-bdr';
import PublicoAlvo from '../model/publico-alvo';
import Visao from '../view/visao';
import RepositorioPublicoAlvo from '../repository/repositorio-publico-alvo';

export class ControladoraFormulario {
	http: HTTP;
	repositorioPublicoAlvo: RepositorioPublicoAlvo;
	visao: Visao;

	constructor() {
		this.http = new HTTPReal();
		this.repositorioPublicoAlvo = new RepositorioPublicoAlvoEmBDR(this.http);
		this.visao = new Visao();
	}

	cadastrarPublicoAlvo = async (publicoAlvo: PublicoAlvo) => {
		try {
			await this.repositorioPublicoAlvo.adicionar(publicoAlvo);
			this.visao.exibirSucesso(MENSAGENS.sucesso.publicoAlvo.cadastradoComSucesso);
		} catch (error) {
			this.visao.exibirErros((error as Error).message);
		}
	};
}
