import RepositorioAvisoEmBDR from '../repository/repositorio-aviso-em-bdr';
import HTTP from '../connection/http';
import HTTPReal from '../connection/http-real';
import RepositorioSetorEmBDR from '../repository/repositorio-setor-em-bdr';
import ServicoAviso from '../service/servico-aviso';
import { MENSAGENS } from '../util/constantes';
import RepositorioAviso from '../repository/repositorio-aviso';
import RepositorioSetor from '../repository/repositorio-setor';
import VisaoListagemAvisos from '../view/visao-listagem-avisos';

export default class ControladoraListagemAvisos {
	http: HTTP;
	repositorioAviso: RepositorioAviso;
	repositorioSetor: RepositorioSetor;
	visao: VisaoListagemAvisos;
	servico: ServicoAviso;

	constructor() {
		this.http = new HTTPReal();
		this.repositorioAviso = new RepositorioAvisoEmBDR(this.http);
		this.repositorioSetor = new RepositorioSetorEmBDR(this.http);
		this.visao = new VisaoListagemAvisos();
		this.servico = new ServicoAviso(this.repositorioAviso, this.repositorioSetor);
	}

	async executar(offset: number = 1): Promise<any> {
		try {
			const todosAvisos = await this.servico.retornarAvisos(offset);
			// this.visao.configurarPaginacao(todosAvisos.length);
			this.visao.limparAvisos();
			this.visao.listarAvisos(todosAvisos);
			this.visao.aoExcluir(this.excluirAviso);
			this.visao.aoClicarEditar(this.redirecionarEditarAviso);
			this.visao.aoClicarClonar(this.redirecionarClonarAviso);
			this.visao.aoClicarProximo();
			this.visao.aoClicarAnterior();
		} catch (error) {
			this.visao.exibirErros((error as Error).message);
		}
	}

	excluirAviso = async (id: number) => {
		try {
			await this.repositorioAviso.remover(id);
			this.visao.exibirSucesso(MENSAGENS.sucesso.aviso.excluidoComSucesso);
			this.visao.recarregarPagina(2);
		} catch (error) {
			this.visao.exibirErros((error as Error).message);
		}
	};

	redirecionarEditarAviso = (id: number) => {
		this.visao.redirecionar(`/avisos/editar/${id}`);
	};

	redirecionarClonarAviso = (id: number) => {
		this.visao.redirecionar(`/avisos/clonar/${id}`);
	};
}
