import Setor from '../model/setor';
import Visao from './visao';

export default class VisaoFormularioSetor extends Visao {
	aoEnviar(callback: CallableFunction): void {
		document.getElementById('formulario-setor')?.addEventListener('submit', (e) => {
			e.preventDefault();
			try {
				const formulario = document.getElementById('formulario-setor') as HTMLFormElement;
				const nome = (formulario.querySelector('#nome') as HTMLInputElement).value;
				const cor = (formulario.querySelector('#cor') as HTMLInputElement).value;
				const setor = new Setor(0, nome, cor);
				setor.validar();
				callback(setor);
			} catch (error) {
				this.exibirErros((error as Error).message);
			}
		});
	}
}
