export default class Visao {
	exibirErros(mensagens: string): void {
		const div = document.getElementById('mensagens') as HTMLDivElement;
		div.innerHTML = '';
		const fechar = document.createElement('span');
		fechar.innerText = 'x';
		div.append(fechar);
		div.classList.add('erro');
		div.classList.remove('sucesso');
		div.classList.remove('escondido');
		const linha = document.createElement('li');
		linha.innerText = mensagens;
		div.append(linha);
		this.fecharModalMensagens();
	}

	exibirSucesso(mensagem: string): void {
		const div = document.getElementById('mensagens') as HTMLDivElement;
		div.innerHTML = '';
		const fechar = document.createElement('span');
		fechar.innerText = 'x';
		div.append(fechar);
		div.classList.add('sucesso');
		div.classList.remove('erro');
		div.classList.remove('escondido');
		const linha = document.createElement('li');
		linha.innerText = mensagem;
		div.append(linha);
		this.fecharModalMensagens();
	}

	fecharModalMensagens(): void {
		const botao = document.querySelector('#mensagens span');
		botao?.addEventListener('click', () => {
			(botao.parentNode as HTMLDivElement).classList.add('escondido');
		});
	}

	pegarRota(posicao: number): any {
		return window.location.pathname.split('/')[posicao];
	}

	recarregarPagina(tempoEmSeg: number = 2) {
		const tempoEmMs = tempoEmSeg * 1000;
		setTimeout(() => {
			location.reload();
		}, tempoEmMs);
	}

	redirecionar(url: string) {
		location.href = url;
	}
}
