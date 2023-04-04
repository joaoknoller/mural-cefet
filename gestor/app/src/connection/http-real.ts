import ConexaoError from '../error/conexao-error';
import { MENSAGENS } from '../util/constantes';
import HTTP from './http';

export default class HTTPReal implements HTTP {
	async get(url: string): Promise<Response> {
		return await fetch(url);
	}

	async post(url: string, dados: any): Promise<Response> {
		try {
			return await fetch(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'same-origin',
				body: JSON.stringify(dados),
			});
		} catch (error) {
			throw new ConexaoError(MENSAGENS.erro.conexao.conexaoInvalida);
		}
	}

	async delete(url: string, id: number): Promise<Response> {
		try {
			return await fetch(`${url}/${id}`, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'same-origin',
			});
		} catch (error) {
			throw new ConexaoError(MENSAGENS.erro.conexao.conexaoInvalida);
		}
	}

	async put(url: string, dados: any): Promise<Response> {
		try {
			return await fetch(`${url}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'same-origin',
				body: JSON.stringify(dados),
			});
		} catch (error) {
			throw new ConexaoError(MENSAGENS.erro.conexao.conexaoInvalida);
		}
	}
}
