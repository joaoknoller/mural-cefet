export class VisaoError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = 'VisaoError';
	}
}
