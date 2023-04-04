import MuralError from '../error/mural-error';
import Aviso from '../model/aviso';
import PeriodoExibicao from '../model/periodo-exibicao';
import { RepositorioAviso } from '../repository/repositorio-aviso';
export default class ServicoAviso {
	repositorioAviso: RepositorioAviso;

	constructor(repositorioAviso: RepositorioAviso) {
		this.repositorioAviso = repositorioAviso;
	}

	private montarAviso(aviso: any): Aviso {
		const periodos: PeriodoExibicao[] = [];

		for (const periodo of aviso.periodosExibicao) {
			periodos.push(
				new PeriodoExibicao(
					periodo.id,
					periodo.descricao,
					periodo.horaInicio,
					periodo.horaFim,
				),
			);
		}
		const objAviso = new Aviso(
			aviso.id,
			aviso.mensagem,
			aviso.ehUrgente,
			aviso.setor.nome,
			aviso.setor.corEmHEX,
			periodos,
		);

		return objAviso;
	}

	private montarAvisoLocalStorage(aviso: any): Aviso {
		const periodos: PeriodoExibicao[] = [];

		for (const periodo of aviso.periodosExibicao) {
			periodos.push(
				new PeriodoExibicao(
					periodo.id,
					periodo.descricao,
					periodo.horaInicio,
					periodo.horaFim,
				),
			);
		}
		const objAviso = new Aviso(
			aviso.id,
			aviso.mensagem,
			aviso.ehUrgente,
			aviso.setorNome,
			aviso.setorCor,
			periodos,
		);

		return objAviso;
	}

	async todosUrgentes(): Promise<Aviso[]> {
		try {
			const todos = await this.repositorioAviso.todos();
			const avisos: any[] = [];

			for (const aviso of todos) {
				if (aviso.ehUrgente == true) {
					const obj = this.montarAviso(aviso);
					avisos.push(obj);
				}
			}
			return avisos;
		} catch (error) {
			throw new MuralError();
		}
	}

	async todosNaoUrgentes(): Promise<Aviso[]> {
		try {
			const todos = await this.repositorioAviso.todos();
			const avisos: any[] = [];

			for (const aviso of todos) {
				if (aviso.ehUrgente == false) {
					const obj = this.montarAviso(aviso);
					avisos.push(obj);
				}
			}

			return avisos;
		} catch (error) {
			throw new MuralError();
		}
	}

	async atualizarAvisos(urgente: boolean = false): Promise<Aviso[]> {
		let avisos: Aviso[] = [];
		try {
			if (urgente) {
				avisos = await this.todosUrgentes();
				this.atualizarLocalStorage(avisos, urgente);
			} else {
				avisos = await this.todosNaoUrgentes();
				this.atualizarLocalStorage(avisos, urgente);
			}
		} catch (error) {
			if (urgente) {
				const json = JSON.parse(window.localStorage.getItem('avisosUrgentes') as string);
				for (const aviso of json) {
					avisos.push(this.montarAviso(aviso));
				}
			} else {
				const json = JSON.parse(window.localStorage.getItem('avisosNaoUrgentes') as string);
				for (const aviso of json) {
					avisos.push(this.montarAviso(aviso));
				}
			}
		}
		return avisos;
	}

	atualizarLocalStorage(avisos: Aviso[], urgente: boolean = false): void {
		if (urgente) window.localStorage.setItem('avisosUrgentes', JSON.stringify(avisos));
		else window.localStorage.setItem('avisosNaoUrgentes', JSON.stringify(avisos));
	}

	pegarAvisosLocalStorage(avisos: string): Aviso[] {
		const array: Aviso[] = [];
		const json = JSON.parse(window.localStorage.getItem(avisos) as string);
		for (const aviso of json) {
			array.push(this.montarAvisoLocalStorage(aviso));
		}

		return array;
	}

	filtrarAvisosPorPeriodoExibicao(avisos: Aviso[]): Aviso[] {
		const avisosFiltrados: Array<Aviso> = [];
		const agora = new Date().toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
		});
		for (const aviso of avisos) {
			aviso.periodosExibicao.forEach((periodo) => {
				if (agora >= periodo.horaInicio && agora < periodo.horaFim)
					avisosFiltrados.push(aviso);
			});
		}
		return avisosFiltrados;
	}
}
