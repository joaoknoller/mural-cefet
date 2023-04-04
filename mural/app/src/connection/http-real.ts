import HTTP from './http';

export default class HTTPReal implements HTTP {
	async get(url: string): Promise<Response> {
		return await fetch(`${url}?validos=true`);
	}
}
