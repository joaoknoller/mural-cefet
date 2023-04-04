export class ModeloError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = 'ModeloError';
	}
}
