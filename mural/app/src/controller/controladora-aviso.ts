import ServicoAviso from '../service/servico-aviso';
import HTTP from '../connection/http';
import HTTPReal from '../connection/http-real';
import VisaoAviso from '../view/visao-aviso';
import { RepositorioAviso } from '../repository/repositorio-aviso';
import RepositorioAvisoEmBDR from '../repository/repositorio-aviso-em-bdr';

export default class ControladoraAviso {
	repositorio: RepositorioAviso;
	http: HTTP;
	servico: ServicoAviso;
	visao: VisaoAviso;

	constructor() {
		this.http = new HTTPReal();
		this.repositorio = new RepositorioAvisoEmBDR(this.http);
		this.servico = new ServicoAviso(this.repositorio);
		this.visao = new VisaoAviso();
	}

	async iniciar(): Promise<void> {
		const configuracoes = {
			quantidadeAvisosPorTela: 3,
			tempoCarrosselEmSeg: 5,
			tempoAtualizacaoServidorEmSeg: 3600000, // 1h
		};
		try {
			let avisosUrgentes = await this.servico.todosUrgentes();
			avisosUrgentes = this.servico.filtrarAvisosPorPeriodoExibicao(avisosUrgentes);
			this.servico.atualizarLocalStorage(avisosUrgentes, true);
			let avisosNaoUrgentes = await this.servico.todosNaoUrgentes();
			avisosNaoUrgentes = this.servico.filtrarAvisosPorPeriodoExibicao(avisosNaoUrgentes);
			this.servico.atualizarLocalStorage(avisosNaoUrgentes);
			this.visao.exibirAvisosUrgentes(avisosUrgentes, configuracoes);
			this.visao.exibirAvisosNaoUrgentes(avisosNaoUrgentes, configuracoes);
			setInterval(async () => {
				this.visao.limparAvisos();
				avisosUrgentes = await this.servico.atualizarAvisos(true);
				avisosUrgentes = this.servico.filtrarAvisosPorPeriodoExibicao(avisosUrgentes);
				avisosNaoUrgentes = await this.servico.atualizarAvisos();
				avisosNaoUrgentes = this.servico.filtrarAvisosPorPeriodoExibicao(avisosNaoUrgentes);
				this.visao.exibirAvisosUrgentes(avisosUrgentes, configuracoes);
				this.visao.exibirAvisosNaoUrgentes(avisosNaoUrgentes, configuracoes);
			}, configuracoes.tempoAtualizacaoServidorEmSeg);
		} catch (error) {
			let avisosUrgentes = this.servico.pegarAvisosLocalStorage('avisosUrgentes');
			avisosUrgentes = this.servico.filtrarAvisosPorPeriodoExibicao(avisosUrgentes);
			let avisosNaoUrgentes = this.servico.pegarAvisosLocalStorage('avisosNaoUrgentes');
			avisosNaoUrgentes = this.servico.filtrarAvisosPorPeriodoExibicao(avisosNaoUrgentes);
			this.visao.exibirAvisosUrgentes(avisosUrgentes, configuracoes);
			this.visao.exibirAvisosNaoUrgentes(avisosNaoUrgentes, configuracoes);
		}
	}
}
