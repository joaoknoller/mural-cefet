import Setor from '../model/setor';
import Visao from './visao';

export default class VisaoListagemSetores extends Visao {
	limparSetores(): void {
		const tabela = document.querySelector('#tabela-listagem tbody') as HTMLTableElement;
		tabela.innerHTML = `
			<tr>
				<th>Id</th>
				<th>Nome</th>
				<th>Cor</th>
			</tr>
		`;
	}

	listarSetores(setores: Setor[]): void {
		const tabela = document.querySelector('#tabela-listagem tbody') as HTMLTableElement;
		for (const setor of setores) {
			const linha = document.createElement('tr');
			const id = document.createElement('td');
			const nome = document.createElement('td');
			const cor = document.createElement('td');
			id.innerText = `${setor.id}`;
			nome.innerText = setor.nome;
			cor.innerText = setor.corEmHEX.toUpperCase();
			cor.setAttribute('style', `background-color: ${setor.corEmHEX}`);
			linha.append(id, nome, cor);
			tabela.append(linha);
		}
	}

	aoClicarAnterior(): void {
		const proximo = document.getElementById('anterior');
		proximo?.addEventListener('click', (e) => {
			e.preventDefault();
			const pagina = +window.location.pathname.split('/')[3];
			if (pagina <= 1) return;
			else {
				this.redirecionar(`/setores/listar/${pagina - 1}`);
			}
		});
	}

	aoClicarProximo(): void {
		const proximo = document.getElementById('proximo');
		proximo?.addEventListener('click', (e) => {
			e.preventDefault();
			const pagina = +window.location.pathname.split('/')[3];
			this.redirecionar(`/setores/listar/${pagina + 1}`);
		});
	}
}
