import MuralError from '../error/mural-error';
import Aviso from '../model/aviso';

export default class VisaoAviso {
	private exibirAvisos(avisos: Aviso[], configuracoes: any, avisosDiv: HTMLDivElement): void {
		if (avisos.length <= 0) {
			avisosDiv.innerHTML = `
				<section class="vazio item">
					<p>Parece que não há nada para mostrar aqui :)</p>
				</section>
			`;
			return;
		}
		const tempoCarrossel = configuracoes.tempoCarrosselEmSeg * 1000;
		const tamanhoCarrosel =
			avisos.length > configuracoes.quantidadeAvisosPorTela
				? configuracoes.quantidadeAvisosPorTela
				: avisos.length;

		for (let i = 0; i < tamanhoCarrosel; i++) {
			const div = document.createElement('div');
			div.classList.add('item');
			div.innerHTML = `
				<section class="aviso-informacoes">
					<h2>Título</h2>
					<span class="setor" style="background-color: ${avisos[i].setorCor}">${avisos[i].setorNome}</span>
					${avisos[i].ehUrgente ? '<span class="urgente">Urgente</span>' : ''}
				</section>
				<p class="aviso-mensagem">${avisos[i].mensagem}</p>
			`;
			avisosDiv?.append(div);
		}

		let inicio = 0;
		setInterval(() => {
			inicio++;
			if (inicio == avisos.length) inicio = 0;

			for (let i = 0; i < tamanhoCarrosel; i++) {
				let texto = avisosDiv?.querySelectorAll('.item p');
				let posicao = inicio + i >= avisos.length ? inicio + i - avisos.length : inicio + i;
				texto![i].textContent = avisos[posicao].mensagem;
			}
		}, tempoCarrossel);
	}

	exibirAvisosUrgentes(avisos: Aviso[], configuracoes: any): void {
		this.exibirAvisos(
			avisos,
			configuracoes,
			document.getElementById('avisos-urgentes') as HTMLDivElement,
		);
	}

	exibirAvisosNaoUrgentes(avisos: Aviso[], configuracoes: any): void {
		this.exibirAvisos(
			avisos,
			configuracoes,
			document.getElementById('avisos-nao-urgentes') as HTMLDivElement,
		);
	}

	limparAvisos(): void {
		(document.getElementById('avisos-urgentes') as HTMLDivElement).innerHTML = '';
		(document.getElementById('avisos-nao-urgentes') as HTMLDivElement).innerHTML = '';
	}
}
