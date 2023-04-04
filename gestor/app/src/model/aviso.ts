import { MENSAGENS } from '../util/constantes';
import Modelo from './modelo';
import PeriodoExibicao from './periodo-exibicao';
import PublicoAlvo from './publico-alvo';
import Setor from './setor';

export default class Aviso extends Modelo {
	#id: number = 0;
	#mensagem: string = '';
	#ehUrgente: boolean = false;
	#setor: Setor;
	#periodosExibicao: Array<PeriodoExibicao> = [];
	#publicosAlvo: Array<PublicoAlvo> = [];
	#validade: string = '';
	// private dataCriacao!: Date;

	constructor(
		id: number,
		mensagem: string,
		ehUrgente: boolean,
		validade: string,
		setor: Setor,
		periodosExibicao: Array<PeriodoExibicao>,
		publicosAlvo: Array<PublicoAlvo>,
		setorId?: number,
		// dataCriacao: Date,
		// public usuario: number,
	) {
		super();
		this.id = id;
		this.mensagem = mensagem;
		this.ehUrgente = ehUrgente;
		this.validade = validade;
		this.#setor = setor;
		this.periodosExibicao = periodosExibicao;
		this.publicosAlvo = publicosAlvo;
		if (typeof setorId !== 'undefined') this.validarSetorId(setorId);
		// this.setDataCriacao(dataCriacao);
	}

	public get id(): number {
		return this.#id;
	}

	public set id(id: number) {
		if (id < 0) this.mensagensErro = MENSAGENS.erro.aviso.idInvalido;
		else this.#id = id;
	}

	public get mensagem(): string {
		return this.#mensagem;
	}

	public set mensagem(mensagem: string) {
		if (mensagem.length <= 0) this.mensagensErro = MENSAGENS.erro.aviso.mensagemInvalida;
		else this.#mensagem = mensagem;
	}

	public get ehUrgente(): boolean {
		return this.#ehUrgente;
	}

	public set ehUrgente(ehUrgente: boolean) {
		this.#ehUrgente = ehUrgente;
	}

	public get periodosExibicao(): Array<PeriodoExibicao> {
		return this.#periodosExibicao;
	}

	public set periodosExibicao(periodosExibicao: Array<PeriodoExibicao>) {
		if (periodosExibicao.length <= 0)
			this.mensagensErro = MENSAGENS.erro.aviso.periodosExibicaoVazio;
		else this.#periodosExibicao = periodosExibicao;
	}

	public get publicosAlvo(): Array<PublicoAlvo> {
		return this.#publicosAlvo;
	}

	public set publicosAlvo(publicosAlvo: Array<PublicoAlvo>) {
		if (publicosAlvo.length <= 0) this.mensagensErro = MENSAGENS.erro.aviso.publicosAlvoVazio;
		else this.#publicosAlvo = publicosAlvo;
	}

	public get setorNome(): string {
		return this.#setor.nome;
	}

	public get setorId(): number {
		return this.#setor.id;
	}

	public get setorCorEmHEX(): string {
		return this.#setor.corEmHEX;
	}

	public set setor(setor: Setor) {
		this.#setor = setor;
	}

	public set validade(validade: string) {
		if (validade.length != 10) this.mensagensErro = MENSAGENS.erro.aviso.validadeInvalida;
		this.#validade = validade;
	}

	public get validade(): string {
		return this.#validade;
	}

	public validarSetorId(setorId: number) {
		if (setorId == 0) this.mensagensErro = MENSAGENS.erro.setor.escolherSetor;
		else if (setorId < 0) this.mensagensErro = MENSAGENS.erro.setor.idInvalido;
	}

	// public getValidade(): Date {
	// 	return this.validade;
	// }
	// public setValidade(validade: Date): void {
	// 	this.validade = validade;
	// }

	// public getDataCriacao(): Date {
	// 	return this.dataCriacao;
	// }
	// public setDataCriacao(dataCriacao: Date): void {
	// 	this.dataCriacao = dataCriacao;
	// }
}
