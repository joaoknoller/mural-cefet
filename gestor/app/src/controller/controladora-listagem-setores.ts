import HTTP from '../connection/http';
import HTTPReal from '../connection/http-real';
import RepositorioSetorEmBDR from '../repository/repositorio-setor-em-bdr';
import RepositorioSetor from '../repository/repositorio-setor';
import VisaoListagemSetores from '../view/visao-listagem-setores';

export default class ControladoraListagemSetores {
	http: HTTP;
	repositorio: RepositorioSetor;
	visao: VisaoListagemSetores;

	constructor() {
		this.http = new HTTPReal();
		this.repositorio = new RepositorioSetorEmBDR(this.http);
		this.visao = new VisaoListagemSetores();
	}

	async executar(offset: number = 1): Promise<any> {
		try {
			const setores = await this.repositorio.todos(offset);
			this.visao.limparSetores();
			this.visao.listarSetores(setores);
			this.visao.aoClicarProximo();
			this.visao.aoClicarAnterior();
		} catch (error) {
			this.visao.exibirErros((error as Error).message);
		}
	}
}
