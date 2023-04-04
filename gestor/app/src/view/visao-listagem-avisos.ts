import Aviso from '../model/aviso';
import Visao from './visao';

// const estado = {
// 	porPagina: 10,
// 	totalPaginas: 0,
// };

export default class VisaoListagemAvisos extends Visao {
	// configurarPaginacao(quantidadeAvisos: number, porPagina: number = 10) {
	// 	estado.totalPaginas = Math.ceil(quantidadeAvisos / porPagina);
	// 	estado.porPagina = porPagina;
	// }

	recarregarPagina(tempoEmSeg: number = 2) {
		const tempoEmMs = tempoEmSeg * 1000;
		setTimeout(() => {
			location.reload();
		}, tempoEmMs);
	}

	redirecionar(url: string) {
		location.href = url;
	}

	limparAvisos(): void {
		const tabela = document.querySelector('#tabela-listagem tbody') as HTMLTableElement;
		tabela.innerHTML = `
			<tr>
				<th>Id</th>
				<th>Mensagem</th>
				<th>Urgência</th>
				<th>Setor</th>
				<th>Ações</th>
			</tr>
		`;
	}

	listarAvisos(avisos: Aviso[]): void {
		const tabela = document.querySelector('#tabela-listagem tbody') as HTMLTableElement;
		for (const aviso of avisos) {
			const linha = document.createElement('tr');
			const id = document.createElement('td');
			const mensagem = document.createElement('td');
			const urgencia = document.createElement('td');
			const setor = document.createElement('td');
			const controles = document.createElement('td');
			id.innerText = `${aviso.id}`;
			id.setAttribute('data-id', `${aviso.id}`);
			mensagem.innerText = aviso.mensagem;
			urgencia.innerText = aviso.ehUrgente == true ? 'Urgente' : 'Não Urgente';
			setor.innerText = aviso.setorNome;
			controles.innerHTML = `
				<a class="editar" href="/">Editar</a>
				<a class="clonar" href="/">Clonar</a>
				<a class="excluir" href="/">Excluir</a>
			`;
			linha.append(id, mensagem, urgencia, setor, controles);
			tabela.append(linha);
		}
	}

	aoExcluir(callback: CallableFunction): void {
		const botoes = document.querySelectorAll('.excluir');
		botoes.forEach((botao) => {
			botao.addEventListener('click', function (this: HTMLElement, e) {
				e.preventDefault();
				const tr = this.closest('tr') as HTMLTableRowElement;
				const id = +((tr.querySelector('td[data-id]') as HTMLTableCellElement).getAttribute(
					'data-id',
				) as string);
				callback(id);
			});
		});
	}

	aoClicarEditar(callback: CallableFunction): void {
		const botoes = document.querySelectorAll('.editar');
		botoes.forEach((botao) => {
			botao.addEventListener('click', function (this: HTMLElement, e) {
				e.preventDefault();
				const tr = this.closest('tr') as HTMLTableRowElement;
				const id = +((tr.querySelector('td[data-id]') as HTMLTableCellElement).getAttribute(
					'data-id',
				) as string);
				callback(id);
			});
		});
	}

	aoClicarClonar(callback: CallableFunction): void {
		const botoes = document.querySelectorAll('.clonar');
		botoes.forEach((botao) => {
			botao.addEventListener('click', function (this: HTMLElement, e) {
				e.preventDefault();
				const tr = this.closest('tr') as HTMLTableRowElement;
				const id = +((tr.querySelector('td[data-id]') as HTMLTableCellElement).getAttribute(
					'data-id',
				) as string);
				callback(id);
			});
		});
	}

	aoClicarAnterior(): void {
		const proximo = document.getElementById('anterior');
		proximo?.addEventListener('click', (e) => {
			e.preventDefault();
			const pagina = +window.location.pathname.split('/')[3];
			if (pagina <= 1) return;
			else {
				this.redirecionar(`/avisos/listar/${pagina - 1}`);
			}
		});
	}

	aoClicarProximo(): void {
		const proximo = document.getElementById('proximo');
		proximo?.addEventListener('click', (e) => {
			e.preventDefault();
			const pagina = +window.location.pathname.split('/')[3];
			this.redirecionar(`/avisos/listar/${pagina + 1}`);
		});
	}
}
