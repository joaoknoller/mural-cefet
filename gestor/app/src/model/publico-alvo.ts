import { ModeloError } from '../error/modelo-error';
import { MENSAGENS } from '../util/constantes';
import Modelo from './modelo';

export default class PublicoAlvo extends Modelo {
	#id: number = 0;
	#descricao: string = '';

	constructor(id: number, descricao: string) {
		super();
		this.id = id;
		this.descricao = descricao;
	}

	public get id(): number {
		return this.#id;
	}

	public set id(id: number) {
		if (id < 0) this.mensagensErro = MENSAGENS.erro.publicoAlvo.idInvalido;
		else if (id == 0) this.mensagensErro = MENSAGENS.erro.publicoAlvo.escolherPublicoAlvo;
		else this.#id = id;
	}

	public get descricao(): string {
		return this.#descricao;
	}

	public set descricao(descricao: string) {
		if (descricao.length <= 0)
			this.mensagensErro = MENSAGENS.erro.publicoAlvo.descricaoInvalida;
		else this.#descricao = descricao;
	}
}
