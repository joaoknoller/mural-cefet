import HTTP from '../connection/http';
import RepositorioError from '../error/repositorio-error';
import Aviso from '../model/aviso';
import { MENSAGENS } from '../util/constantes';
import RepositorioAviso from './repositorio-aviso';

const API_AVISOS = 'http://localhost:8080/avisos';

export default class RepositorioAvisoEmBDR implements RepositorioAviso {
	http;

	constructor(http: HTTP) {
		this.http = http;
	}

	async adicionar(obj: any): Promise<boolean> {
		const resposta = await this.http.post(API_AVISOS, obj);

		if (resposta.ok) {
			return true;
		} else {
			throw new RepositorioError(
				`${MENSAGENS.erro.aviso.cadastroInvalido} Status: ${
					resposta.status
				}\n${await resposta.text()}`,
			);
		}
	}

	async todos(offset: number = 1): Promise<any[]> {
		const resposta = await this.http.get(`${API_AVISOS}?offset=${offset}`);

		if (resposta.ok) {
			return await resposta.json();
		} else {
			throw new RepositorioError(
				`${MENSAGENS.erro.aviso.consultaInvalida}. Status: ${resposta.status}`,
			);
		}
	}

	async porId(id: number): Promise<Aviso> {
		const resposta = await this.http.get(`${API_AVISOS}/${id}`);

		if (resposta.ok) {
			return await resposta.json();
		} else {
			throw new RepositorioError(
				`${MENSAGENS.erro.aviso.consultaInvalida}. Status: ${resposta.status}`,
			);
		}
	}

	async remover(id: number): Promise<boolean> {
		const resposta = await this.http.delete(API_AVISOS, id);

		if (resposta.ok) {
			return true;
		} else {
			throw new RepositorioError(
				`${MENSAGENS.erro.aviso.consultaInvalida}. Status: ${resposta.status}`,
			);
		}
	}

	async alterar(obj: any): Promise<boolean> {
		const resposta = await this.http.put(API_AVISOS, obj);

		if (resposta.ok) {
			return true;
		} else {
			throw new RepositorioError(
				`${MENSAGENS.erro.aviso.edicaoInvalida} Status: ${
					resposta.status
				}\n${await resposta.text()}`,
			);
		}
	}
}
