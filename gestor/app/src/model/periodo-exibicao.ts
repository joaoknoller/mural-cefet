import { MENSAGENS } from '../util/constantes';
import Modelo from './modelo';

export default class PeriodoExibicao extends Modelo {
	#id: number = 0;
	#descricao: string = '';
	#horaInicio: Date = new Date();
	#horaFim: Date = new Date();

	constructor(id: number, descricao: string, horaInicio: Date, horaFim: Date) {
		super();
		this.id = id;
		this.descricao = descricao;
		this.horaInicio = horaInicio;
		this.horaFim = horaFim;
	}

	public get id(): number {
		return this.#id;
	}

	public set id(id: number) {
		if (id < 0) this.mensagensErro = MENSAGENS.erro.periodoExibicao.idInvalido;
		else if (id == 0)
			this.mensagensErro = MENSAGENS.erro.periodoExibicao.escolherPeriodoExibicao;
		else this.#id = id;
	}

	public get descricao(): string {
		return this.#descricao;
	}

	public set descricao(descricao: string) {
		if (descricao.length <= 0)
			this.mensagensErro = MENSAGENS.erro.periodoExibicao.descricaoInvalida;
		else this.#descricao = descricao;
	}

	public get horaInicio(): Date {
		return this.#horaInicio;
	}

	public set horaInicio(horaInicio: Date) {
		this.#horaInicio = horaInicio;
	}

	public get horaFim(): Date {
		return this.#horaFim;
	}

	public set horaFim(horaFim: Date) {
		this.#horaFim = horaFim;
	}
}
