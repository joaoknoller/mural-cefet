import ServicoError from '../error/servico-error';
import Aviso from '../model/aviso';
import Setor from '../model/setor';
import RepositorioSetor from '../repository/repositorio-setor';

export default class ServicoSetor {
	repositorio: RepositorioSetor;

	constructor(repositorio: RepositorioSetor) {
		this.repositorio = repositorio;
	}

	private montarObjeto(setor: Setor): any {
		const obj = {
			id: setor.id,
			nome: setor.nome,
			corEmHEX: setor.corEmHEX,
		};
		return obj;
	}

	async adicionar(setor: Setor): Promise<boolean> {
		const obj = this.montarObjeto(setor);
		try {
			this.repositorio.adicionar(obj);
			return true;
		} catch (error) {
			throw new ServicoError();
		}
	}
}
