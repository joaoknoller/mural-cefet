import RepositorioAvisoEmBDR from '../repository/repositorio-aviso-em-bdr';
import RepositorioSetorEmBDR from '../repository/repositorio-setor-em-bdr';
import { MENSAGENS } from '../util/constantes';
import VisaoFormularioAviso from '../view/visao-formulario-aviso';
import RepositorioPublicoAlvoEmBDR from '../repository/repositorio-publico-alvo-em-bdr';
import RepositorioPeriodoExibicaoEmBDR from '../repository/repositorio-periodo-exibicao-em-bdr';
import Aviso from '../model/aviso';
import PublicoAlvo from '../model/publico-alvo';
import ServicoAviso from '../service/servico-aviso';
import { ControladoraFormulario } from './controladora-formulario';

export default class ControladoraCadastroAviso extends ControladoraFormulario {
	repositorioAviso: RepositorioAvisoEmBDR;
	repositorioSetor: RepositorioSetorEmBDR;
	repositorioPublicoAlvo: RepositorioPublicoAlvoEmBDR;
	repositorioPeriodoExibicao: RepositorioPeriodoExibicaoEmBDR;
	visao: VisaoFormularioAviso;
	servico: ServicoAviso;

	constructor() {
		super();
		this.repositorioAviso = new RepositorioAvisoEmBDR(this.http);
		this.repositorioSetor = new RepositorioSetorEmBDR(this.http);
		this.repositorioPublicoAlvo = new RepositorioPublicoAlvoEmBDR(this.http);
		this.repositorioPeriodoExibicao = new RepositorioPeriodoExibicaoEmBDR(this.http);
		this.visao = new VisaoFormularioAviso();
		this.servico = new ServicoAviso(this.repositorioAviso, this.repositorioSetor);
	}

	async executar(): Promise<void> {
		try {
			const setores = await this.repositorioSetor.todos();
			const publicosAlvo = await this.repositorioPublicoAlvo.todos();
			const periodosExibicao = await this.repositorioPeriodoExibicao.todos();
			this.visao.preencherSelect(setores);
			this.visao.exibirPeriodosExibicao(periodosExibicao);
			this.visao.exibirPublicosAlvo(publicosAlvo);
			this.visao.aoClicarNovoPublicoAlvo();
			this.visao.aoClicarCadastrarPublicoAlvo(this.cadastrarPublicoAlvo);
			this.visao.aoEnviar(this.cadastrarAviso, setores, periodosExibicao, publicosAlvo);
		} catch (error) {
			this.visao.exibirErros((error as Error).message);
		}
	}

	cadastrarAviso = async (aviso: Aviso) => {
		try {
			await this.servico.adicionar(aviso);
			this.visao.exibirSucesso(MENSAGENS.sucesso.aviso.cadastradoComSucesso);
		} catch (error) {
			this.visao.exibirErros((error as Error).message);
		}
	};

	cadastrarPublicoAlvo = async (publicoAlvo: PublicoAlvo) => {
		try {
			await this.repositorioPublicoAlvo.adicionar(publicoAlvo);
			this.visao.exibirSucesso(MENSAGENS.sucesso.publicoAlvo.cadastradoComSucesso);
		} catch (error) {
			this.visao.exibirErros((error as Error).message);
		}
	};
}
