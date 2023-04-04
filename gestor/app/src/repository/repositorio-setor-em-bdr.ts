import Setor from '../model/setor';
import RepositorioError from '../error/repositorio-error';
import RepositorioSetor from './repositorio-setor';
import { MENSAGENS } from '../util/constantes';
import HTTP from '../connection/http';

const API_SETORES = 'http://localhost:8080/setores';

export default class RepositorioSetorEmBDR implements RepositorioSetor {
	http: HTTP;

	constructor(http: HTTP) {
		this.http = http;
	}

	async adicionar(setor: Setor): Promise<boolean> {
		const resposta = await this.http.post(API_SETORES, setor);

		if (resposta.ok) {
			return true;
		} else {
			throw new RepositorioError(
				`${MENSAGENS.erro.setor.cadastroInvalido}. Status: ${resposta.status}`,
			);
		}
	}

	async todos(offset: number = 1): Promise<Setor[]> {
		const setores: Setor[] = [];
		const resposta = await this.http.get(`${API_SETORES}?offset=${offset}`);

		if (resposta.ok) {
			const resultado = await resposta.json();
			for (const setor of resultado) {
				setores.push(new Setor(setor.id, setor.nome, setor.corEmHEX));
			}

			return setores;
		} else {
			throw new RepositorioError(
				`${MENSAGENS.erro.setor.consultaInvalida}. Status: ${resposta.status}`,
			);
		}
	}

	async porId(id: number): Promise<Setor> {
		const resposta = await fetch(`${API_SETORES}/${id}`);

		if (resposta.ok) {
			const json = await resposta.json();
			const setor = new Setor(json.id, json.nome, json.corEmHEX);

			return setor;
		} else {
			throw new RepositorioError(
				`${MENSAGENS.erro.setor.consultaInvalida}. Status: ${resposta.status}`,
			);
		}
	}
}
