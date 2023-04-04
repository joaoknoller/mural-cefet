import HTTP from '../connection/http';
import MuralError from '../error/mural-error';
import { RepositorioAviso } from './repositorio-aviso';

const API_AVISOS = 'http://localhost:8080/avisos';

export default class RepositorioAvisoEmBDR implements RepositorioAviso {
	http;

	constructor(http: HTTP) {
		this.http = http;
	}

	async todos(): Promise<any[]> {
		const resposta = await this.http.get(API_AVISOS);

		if (resposta.ok) {
			return await resposta.json();
		} else {
			throw new MuralError();
		}
	}
}
