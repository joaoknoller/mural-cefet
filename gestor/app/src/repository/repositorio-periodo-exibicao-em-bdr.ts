import RepositorioError from '../error/repositorio-error';
import { MENSAGENS } from '../util/constantes';
import HTTP from '../connection/http';
import PeriodoExibicao from '../model/periodo-exibicao';
import RepositorioPeriodoExibicao from './repositorio-periodo-exibicao';

const API_PERIODOS_EXIBICAO = 'http://localhost:8080/periodos-exibicao';

export default class RepositorioPeriodoExibicaoEmBDR implements RepositorioPeriodoExibicao {
	http: HTTP;

	constructor(http: HTTP) {
		this.http = http;
	}

	async todos(): Promise<PeriodoExibicao[]> {
		const periodos: PeriodoExibicao[] = [];
		const resposta = await fetch(API_PERIODOS_EXIBICAO);

		if (resposta.ok) {
			const resultado = await resposta.json();
			for (const periodo of resultado) {
				periodos.push(
					new PeriodoExibicao(
						periodo.id,
						periodo.descricao,
						periodo.horaInicio,
						periodo.horaFim,
					),
				);
			}

			return periodos;
		} else {
			throw new RepositorioError(
				`${MENSAGENS.erro.periodoExibicao.consultaInvalida}. Status: ${resposta.status}`,
			);
		}
	}

	async porId(id: number): Promise<PeriodoExibicao> {
		const resposta = await fetch(`${API_PERIODOS_EXIBICAO}/${id}`);

		if (resposta.ok) {
			const json = await resposta.json();
			const periodo = new PeriodoExibicao(
				json.id,
				json.descricao,
				json.horaInicio,
				json.horaFim,
			);

			return periodo;
		} else {
			throw new RepositorioError(
				`${MENSAGENS.erro.periodoExibicao.consultaInvalida}. Status: ${resposta.status}`,
			);
		}
	}

	async atualizar(periodo: PeriodoExibicao): Promise<any> {
		// to-do
	}
}
