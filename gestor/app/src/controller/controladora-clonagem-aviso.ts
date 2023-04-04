import RepositorioAvisoEmBDR from '../repository/repositorio-aviso-em-bdr';
import RepositorioSetorEmBDR from '../repository/repositorio-setor-em-bdr';
import { MENSAGENS } from '../util/constantes';
import RepositorioPublicoAlvoEmBDR from '../repository/repositorio-publico-alvo-em-bdr';
import RepositorioPeriodoExibicaoEmBDR from '../repository/repositorio-periodo-exibicao-em-bdr';
import Aviso from '../model/aviso';
import ServicoAviso from '../service/servico-aviso';
import { ControladoraFormulario } from './controladora-formulario';
import RepositorioAviso from '../repository/repositorio-aviso';
import RepositorioSetor from '../repository/repositorio-setor';
import RepositorioPublicoAlvo from '../repository/repositorio-publico-alvo';
import RepositorioPeriodoExibicao from '../repository/repositorio-periodo-exibicao';
import VisaoFormularioAviso from '../view/visao-formulario-aviso';

export default class ControladoraClonagemAviso extends ControladoraFormulario {
	repositorioAviso: RepositorioAviso;
	repositorioSetor: RepositorioSetor;
	repositorioPublicoAlvo: RepositorioPublicoAlvo;
	repositorioPeriodoExibicao: RepositorioPeriodoExibicao;
	visao: VisaoFormularioAviso;
	servico: ServicoAviso;

	constructor() {
		super();
		this.repositorioAviso = new RepositorioAvisoEmBDR(this.http);
		this.repositorioSetor = new RepositorioSetorEmBDR(this.http);
		this.repositorioPublicoAlvo = new RepositorioPublicoAlvoEmBDR(this.http);
		this.repositorioPeriodoExibicao = new RepositorioPeriodoExibicaoEmBDR(this.http);
		this.servico = new ServicoAviso(this.repositorioAviso, this.repositorioSetor);
		this.visao = new VisaoFormularioAviso();
	}

	async executar(id: number): Promise<void> {
		try {
			const setores = await this.repositorioSetor.todos();
			const publicosAlvo = await this.repositorioPublicoAlvo.todos();
			const periodosExibicao = await this.repositorioPeriodoExibicao.todos();
			const aviso = await this.repositorioAviso.porId(id);
			this.visao.preencherSelect(setores, aviso.setor);
			this.visao.preencherMensagem(aviso.mensagem);
			this.visao.preencherUrgencia(aviso.ehUrgente);
			this.visao.exibirPeriodosExibicao(periodosExibicao, aviso.periodosExibicao);
			this.visao.exibirPublicosAlvo(publicosAlvo, aviso.publicosAlvo);
			this.visao.aoClicarNovoPublicoAlvo();
			this.visao.aoClicarCadastrarPublicoAlvo(this.cadastrarPublicoAlvo);
			this.visao.aoEnviar(this.clonarAviso, setores, periodosExibicao, publicosAlvo);
		} catch (error) {
			this.visao.exibirErros((error as Error).message);
		}
	}

	clonarAviso = async (aviso: Aviso) => {
		try {
			await this.servico.adicionar(aviso);
			this.visao.exibirSucesso(MENSAGENS.sucesso.aviso.clonadoComSucesso);
		} catch (error) {
			this.visao.exibirErros((error as Error).message);
		}
	};
}
