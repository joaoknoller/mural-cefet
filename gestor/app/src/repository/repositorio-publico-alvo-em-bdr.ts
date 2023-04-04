import HTTP from '../connection/http';
import RepositorioError from '../error/repositorio-error';
import PublicoAlvo from '../model/publico-alvo';
import { MENSAGENS } from '../util/constantes';
import RepositorioPublicoAlvo from './repositorio-publico-alvo';

const API_PUBLICOS_ALVO = 'http://localhost:8080/publicos-alvo';

export default class RepositorioPublicoAlvoEmBDR implements RepositorioPublicoAlvo {
	http: HTTP;

	constructor(http: HTTP) {
		this.http = http;
	}

	async adicionar(publicoAlvo: PublicoAlvo): Promise<boolean> {
		const resposta = await this.http.post(API_PUBLICOS_ALVO, publicoAlvo.descricao);

		if (resposta.ok) {
			return true;
		} else {
			throw new RepositorioError(
				`${MENSAGENS.erro.publicoAlvo.cadastroInvalido}. Status: ${resposta.status}`,
			);
		}
	}

	async todos(): Promise<PublicoAlvo[]> {
		const publicosAlvo: PublicoAlvo[] = [];
		const resposta = await fetch(API_PUBLICOS_ALVO);

		if (resposta.ok) {
			const resultado = await resposta.json();
			for (const publicoAlvo of resultado) {
				publicosAlvo.push(new PublicoAlvo(publicoAlvo.id, publicoAlvo.descricao));
			}

			return publicosAlvo;
		} else {
			throw new RepositorioError(
				`${MENSAGENS.erro.publicoAlvo.consultaInvalida}. Status: ${resposta.status}`,
			);
		}
	}

	async porId(id: number): Promise<PublicoAlvo> {
		const resposta = await fetch(`${API_PUBLICOS_ALVO}/${id}`);

		if (resposta.ok) {
			const json = await resposta.json();
			return new PublicoAlvo(json.id, json.descricao);
		} else {
			throw new RepositorioError(
				`${MENSAGENS.erro.publicoAlvo.consultaInvalida}. Status: ${resposta.status}`,
			);
		}
	}
}
