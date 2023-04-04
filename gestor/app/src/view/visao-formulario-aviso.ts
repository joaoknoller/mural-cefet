import Aviso from '../model/aviso';
import PeriodoExibicao from '../model/periodo-exibicao';
import PublicoAlvo from '../model/publico-alvo';
import Setor from '../model/setor';
import Visao from './visao';

export default class VisaoFormularioAviso extends Visao {
	private gerarCheckboxes(
		elemento: HTMLElement,
		nome: string,
		valor: number,
		texto: string,
		selecionado?: boolean,
	) {
		elemento.innerHTML += `
			<label>
				<input type="checkbox" name="${nome}" value="${valor}" ${selecionado ? 'checked' : ''}/>
				${texto}
			</label>
		`;
	}

	private pegarIdsSelecionados(inputs: NodeListOf<any>) {
		const array: any[] = [];
		inputs.forEach((input) => {
			const inputCheckbox = input as HTMLInputElement;
			if (inputCheckbox.checked) array.push(+inputCheckbox.value);
		});
		return array;
	}

	private setorSelecionado(optionSetor: HTMLOptionElement, setores: Array<Setor>): any {
		let s;
		if (+optionSetor.value == 0) {
			return new Setor(
				0,
				optionSetor.textContent as string,
				optionSetor.getAttribute('data-cor') as string,
			);
		} else {
			setores.forEach((setor) => {
				if (setor.id == +optionSetor.value) {
					s = setor;
				}
			});
		}
		return s;
	}

	private objetosSelecionados(
		objetosIds: Array<Number>,
		objetos: Array<PublicoAlvo | PeriodoExibicao>,
	): Array<any> {
		const objetosArray: Array<PublicoAlvo | PeriodoExibicao> = [];
		objetos.forEach((obj) => {
			objetosIds.forEach((id) => {
				if (id == obj.id) {
					objetosArray.push(obj);
				}
			});
		});
		return objetosArray;
	}

	preencherSelect(setores: Array<Setor>, setorEdicao?: Setor): void {
		const select = document.getElementById('setorId');
		setores.forEach((setor) => {
			const option = document.createElement('option');
			option.value = `${setor.id}`;
			option.textContent = setor.nome;
			option.setAttribute('data-cor', setor.corEmHEX);
			if (setorEdicao?.id == setor.id) option.setAttribute('selected', 'true');
			select?.appendChild(option);
		});
	}

	preencherMensagem(mensagem: string): void {
		(document.getElementById('mensagem') as HTMLTextAreaElement).innerText = mensagem;
	}

	preencherUrgencia(ehUrgente: boolean): void {
		(document.getElementById('ehUrgente') as HTMLInputElement).checked = ehUrgente;
	}

	preencherValidade(validade: Date): void {
		(document.getElementById('validade') as HTMLInputElement).value = `${validade}`.split(
			' ',
		)[0];
	}

	exibirPublicosAlvo(
		publicosAlvo: Array<PublicoAlvo>,
		publicosAlvoEdicao?: Array<PublicoAlvo>,
	): void {
		const div = document.getElementById('publicos-alvo-cadastrados') as HTMLDivElement;
		let publicosMarcados: Array<PublicoAlvo> = [];
		let publicosNaoMarcados: Array<PublicoAlvo> = [];
		if (publicosAlvoEdicao) {
			for (const publico of publicosAlvo) {
				for (const pae of publicosAlvoEdicao) {
					if (pae.id == publico.id) publicosMarcados.push(publico);
				}
			}
			publicosNaoMarcados = publicosAlvo.filter(
				(publico) => !publicosMarcados.includes(publico),
			);
		} else {
			publicosNaoMarcados = publicosAlvo;
		}
		for (const publico of publicosMarcados) {
			this.gerarCheckboxes(
				div,
				publico.descricao.toLowerCase(),
				publico.id,
				publico.descricao,
				true,
			);
		}
		for (const publico of publicosNaoMarcados) {
			this.gerarCheckboxes(
				div,
				publico.descricao.toLowerCase(),
				publico.id,
				publico.descricao,
			);
		}
	}

	exibirPeriodosExibicao(
		periodosExibicao: Array<PeriodoExibicao>,
		periodosExibicaoEdicao?: Array<PeriodoExibicao>,
	): void {
		const div = document.getElementById('periodos-exibicao') as HTMLDivElement;
		let periodosMarcados: Array<PeriodoExibicao> = [];
		let periodosNaoMarcados: Array<PeriodoExibicao> = [];
		if (periodosExibicaoEdicao) {
			for (const periodo of periodosExibicao) {
				for (const pee of periodosExibicaoEdicao) {
					if (pee.id == periodo.id) periodosMarcados.push(periodo);
				}
			}
			periodosNaoMarcados = periodosExibicao.filter(
				(periodo) => !periodosMarcados.includes(periodo),
			);
		} else {
			periodosNaoMarcados = periodosExibicao;
		}

		for (const periodo of periodosMarcados) {
			this.gerarCheckboxes(
				div,
				periodo.descricao.toLowerCase(),
				periodo.id,
				periodo.descricao,
				true,
			);
		}
		for (const periodo of periodosNaoMarcados) {
			this.gerarCheckboxes(
				div,
				periodo.descricao.toLowerCase(),
				periodo.id,
				periodo.descricao,
			);
		}
	}

	aoEnviar(
		callback: CallableFunction,
		todosSetores: Array<Setor>,
		todosPeriodosExibicao: Array<PeriodoExibicao>,
		todosPublicosAlvo: Array<PublicoAlvo>,
		id?: number,
	): void {
		document.getElementById('formulario-aviso')?.addEventListener('submit', (e) => {
			e.preventDefault();
			try {
				const formulario = document.getElementById('formulario-aviso') as HTMLFormElement;
				const mensagem = (formulario.querySelector('#mensagem') as HTMLTextAreaElement)
					.value;
				const ehUrgente = (formulario.querySelector('#ehUrgente') as HTMLInputElement)
					.checked;
				const validade = (formulario.querySelector('#validade') as HTMLInputElement).value;
				const selectSetor = formulario.querySelector('#setorId') as HTMLSelectElement;
				const setor = this.setorSelecionado(
					selectSetor.options[selectSetor.selectedIndex],
					todosSetores,
				);
				const periodosExibicaoIds: number[] = this.pegarIdsSelecionados(
					formulario.querySelectorAll('#periodos-exibicao input[type="checkbox"]'),
				);
				const periodosExibicao = this.objetosSelecionados(
					periodosExibicaoIds,
					todosPeriodosExibicao,
				);
				const publicosAlvoIds: number[] = this.pegarIdsSelecionados(
					formulario.querySelectorAll(
						'#publicos-alvo-cadastrados input[type="checkbox"]',
					),
				);
				const publicosAlvo = this.objetosSelecionados(publicosAlvoIds, todosPublicosAlvo);
				const aviso = new Aviso(
					id ? id : 0,
					mensagem,
					ehUrgente,
					validade,
					setor,
					periodosExibicao,
					publicosAlvo,
					setor.id,
				);
				aviso.validar();
				callback(aviso);
			} catch (error) {
				this.exibirErros((error as Error).message);
			}
		});
	}

	aoClicarNovoPublicoAlvo(): void {
		document.getElementById('novo')?.addEventListener('click', () => {
			document
				.getElementById('novo-publico-alvo')
				?.parentElement?.classList.toggle('escondido');
		});
	}

	aoClicarCadastrarPublicoAlvo(callback: CallableFunction): void {
		document.getElementById('cadastrar-publico-alvo')?.addEventListener('click', () => {
			try {
				const descricao = (document.getElementById('novo-publico-alvo') as HTMLInputElement)
					.value;
				const publicoAlvo = new PublicoAlvo(0, descricao);
				publicoAlvo.validar();
				callback(publicoAlvo);
			} catch (error) {
				this.exibirErros((error as Error).message);
			}
		});
	}
}
