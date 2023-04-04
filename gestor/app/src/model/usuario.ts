import { MENSAGENS } from '../util/constantes';
import Modelo from './modelo';

export default class Usuario extends Modelo {
	#id: number = 0;
	#nome: string = '';
	#login: string = '';
	#hashSenha: string = '';

	constructor(id: number, nome: string, login: string, hashSenha: string) {
		super();
		this.id = id;
		this.nome = nome;
		this.login = login;
		this.hashSenha = hashSenha;
	}

	public get id(): number {
		return this.#id;
	}

	public set id(id: number) {
		if (id < 0) this.mensagensErro = MENSAGENS.erro.aviso.idInvalido;
		else this.#id = id;
	}

	public get nome(): string {
		return this.#nome;
	}

	public set nome(nome: string) {
		if (nome.length <= 0) this.mensagensErro = MENSAGENS.erro.usuario.nomeInvalido;
		this.#nome = nome;
	}

	public get login(): string {
		return this.#login;
	}

	public set login(login: string) {
		if (login.length <= 0) this.mensagensErro = MENSAGENS.erro.usuario.loginInvalido;
		this.#login = login;
	}

	public get hashSenha(): string {
		return this.#hashSenha;
	}

	public set hashSenha(senha: string) {
		if (senha.length <= 0) this.mensagensErro = MENSAGENS.erro.usuario.hashSenhaInvalida;
		this.#hashSenha = senha;
	}
}
