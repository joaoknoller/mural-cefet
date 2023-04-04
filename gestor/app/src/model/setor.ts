import { ModeloError } from '../error/modelo-error';
import { MENSAGENS } from '../util/constantes';
import Modelo from './modelo';

export default class Setor extends Modelo {
	#id: number = 0;
	#nome: string = '';
	#corEmHEX: string = '';

	constructor(id: number, nome: string, corEmHEX: string) {
		super();
		this.id = id;
		this.nome = nome;
		this.corEmHEX = corEmHEX;
	}

	public get id(): number {
		return this.#id;
	}

	public set id(id: number) {
		if (id < 0) this.mensagensErro = MENSAGENS.erro.setor.idInvalido;
		else this.#id = id;
	}

	public get nome(): string {
		return this.#nome;
	}

	public set nome(nome: string) {
		if (nome.length <= 0) this.mensagensErro = MENSAGENS.erro.setor.nomeInvalido;
		else this.#nome = nome;
	}

	public get corEmHEX(): string {
		return this.#corEmHEX;
	}

	public set corEmHEX(cor: string) {
		if (cor.length != 7) this.mensagensErro = MENSAGENS.erro.setor.corInvalida;
		else this.#corEmHEX = cor;
	}
}
