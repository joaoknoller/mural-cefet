export default class PeriodoExibicao {
	id: number;
	descricao: string;
	horaInicio: string;
	horaFim: string;

	constructor(id: number, descricao: string, horaInicio: string, horaFim: string) {
		this.id = id;
		this.descricao = descricao;
		this.horaInicio = horaInicio;
		this.horaFim = horaFim;
	}
}
