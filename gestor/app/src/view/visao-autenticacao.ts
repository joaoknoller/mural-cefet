import Visao from './visao';

export default class VisaoAutenticacao extends Visao {
	aoLogar(callback: CallableFunction): void {
		const formulario = document.getElementById('formulario-login') as HTMLFormElement;
		formulario.addEventListener('submit', function (this: HTMLFormElement, e) {
			e.preventDefault();
			const dados = {
				login: (this.querySelector('#login') as HTMLInputElement).value,
				senha: (this.querySelector('#senha') as HTMLInputElement).value,
			};
			callback(dados);
		});
	}
}
