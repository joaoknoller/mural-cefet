import { ModeloError } from '../error/modelo-error';

export default class Modelo {
	#mensagensErro = '';

	public validar() {
		if (this.#mensagensErro.length > 0) throw new ModeloError(this.mensagensErro);
	}

	public set mensagensErro(mensagem: string) {
		this.#mensagensErro += mensagem;
	}

	public get mensagensErro(): string {
		return this.#mensagensErro;
	}
}
