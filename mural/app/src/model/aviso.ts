import PeriodoExibicao from './periodo-exibicao';

export default class Aviso {
	id: number;
	mensagem: string;
	ehUrgente: boolean;
	setorNome: string;
	setorCor: string;
	periodosExibicao: PeriodoExibicao[];

	constructor(
		id: number,
		mensagem: string,
		ehUrgente: boolean,
		setorNome: string,
		setorCor: string,
		periodosExibicao: PeriodoExibicao[],
	) {
		this.id = id;
		this.mensagem = mensagem;
		this.ehUrgente = ehUrgente;
		this.setorNome = setorNome;
		this.setorCor = setorCor;
		this.periodosExibicao = periodosExibicao;
	}
}
