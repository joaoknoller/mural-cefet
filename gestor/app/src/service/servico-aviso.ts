import ServicoError from '../error/servico-error';
import Aviso from '../model/aviso';
import RepositorioAviso from '../repository/repositorio-aviso';
import RepositorioSetor from '../repository/repositorio-setor';

export default class ServicoAviso {
	repositorioAviso: RepositorioAviso;
	repositorioSetor: RepositorioSetor;

	constructor(repositorioAviso: RepositorioAviso, repositorioSetor: RepositorioSetor) {
		this.repositorioAviso = repositorioAviso;
		this.repositorioSetor = repositorioSetor;
	}

	private montarObjeto(aviso: Aviso): any {
		const publicosAlvoIds = aviso.publicosAlvo.map((publico) => publico.id);
		const periodosExibicaoIds = aviso.periodosExibicao.map((periodo) => periodo.id);
		const obj = {
			id: aviso.id,
			mensagem: aviso.mensagem,
			ehUrgente: aviso.ehUrgente,
			validade: aviso.validade,
			setorId: aviso.setorId,
			publicosAlvoIds: publicosAlvoIds,
			periodosExibicaoIds: periodosExibicaoIds,
		};
		return obj;
	}

	async retornarAvisos(offset: number = 1): Promise<Aviso[]> {
		const avisos = [];
		const avisosEmJSON = await this.repositorioAviso.todos(offset);

		for (const aviso of avisosEmJSON) {
			avisos.push(
				new Aviso(
					aviso.id,
					aviso.mensagem,
					aviso.ehUrgente,
					aviso.validade.date,
					aviso.setor,
					aviso.periodosExibicao,
					aviso.publicosAlvo,
				),
			);
		}

		return avisos;
	}

	async adicionar(aviso: Aviso): Promise<boolean> {
		const obj = this.montarObjeto(aviso);
		try {
			this.repositorioAviso.adicionar(obj);
			return true;
		} catch (error) {
			throw new ServicoError();
		}
	}

	async alterar(aviso: Aviso): Promise<boolean> {
		const obj = this.montarObjeto(aviso);
		try {
			this.repositorioAviso.alterar(obj);
			return true;
		} catch (error) {
			throw new ServicoError();
		}
	}
}
