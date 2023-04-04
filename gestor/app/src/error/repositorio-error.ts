export default class RepositorioError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = 'RepositorioError';
	}
}
