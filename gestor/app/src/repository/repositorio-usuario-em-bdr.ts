import HTTP from '../connection/http';
import AutenticacaoError from '../error/autenticacao-error';
import RepositorioError from '../error/repositorio-error';
import Usuario from '../model/usuario';
import { MENSAGENS } from '../util/constantes';
import RepositorioUsuario from './repositorio-usuario';

const API_USUARIOS = 'http://localhost:8080/usuarios';
const API_AUTENTICACAO = 'http://localhost:8080/autenticacao';

export default class RepositorioUsuarioEmBDR implements RepositorioUsuario {
	http;

	constructor(http: HTTP) {
		this.http = http;
	}

	async adicionar(usuario: Usuario): Promise<boolean> {
		const obj = {
			id: usuario.id,
			nome: usuario.nome,
			login: usuario.login,
			hashSenha: usuario.hashSenha,
		};
		const resposta = await this.http.post(API_USUARIOS, obj);

		if (resposta.ok) {
			return true;
		} else {
			throw new RepositorioError(
				`${MENSAGENS.erro.usuario.cadastroInvalido} Status: ${
					resposta.status
				}\n${await resposta.text()}`,
			);
		}
	}

	async todos(): Promise<any[]> {
		const resposta = await this.http.get(API_USUARIOS);

		if (resposta.ok) {
			return await resposta.json();
		} else {
			throw new RepositorioError(
				`${MENSAGENS.erro.usuario.consultaInvalida}. Status: ${resposta.status}`,
			);
		}
	}

	async autenticar(dados: Object): Promise<string> {
		const resposta = await this.http.post(API_AUTENTICACAO, dados);
		if (resposta.ok) {
			return await resposta.json();
		} else {
			throw new AutenticacaoError(`${await resposta.text()}.`);
		}
	}
}
