import RepositorioSetorEmBDR from '../repository/repositorio-setor-em-bdr';
import { MENSAGENS } from '../util/constantes';
import VisaoFormularioSetor from '../view/visao-formulario-setor';
import { ControladoraFormulario } from './controladora-formulario';
import Setor from '../model/setor';
import ServicoSetor from '../service/servico-setor';

export default class ControladoraCadastroSetor extends ControladoraFormulario {
	repositorio: RepositorioSetorEmBDR;
	visao: VisaoFormularioSetor;
	servico: ServicoSetor;

	constructor() {
		super();
		this.repositorio = new RepositorioSetorEmBDR(this.http);
		this.visao = new VisaoFormularioSetor();
		this.servico = new ServicoSetor(this.repositorio);
	}

	async executar(): Promise<void> {
		try {
			this.visao.aoEnviar(this.cadastrarSetor);
		} catch (error) {
			this.visao.exibirErros((error as Error).message);
		}
	}

	cadastrarSetor = async (setor: Setor) => {
		try {
			await this.servico.adicionar(setor);
			this.visao.exibirSucesso(MENSAGENS.sucesso.setor.cadastradoComSucesso);
		} catch (error) {
			this.visao.exibirErros((error as Error).message);
		}
	};
}
