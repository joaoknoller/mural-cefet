import HTTP from './http';

export default class HTTPFalso implements HTTP {
	get(): Promise<any> {
		return Promise.resolve([]);
	}

	post(url?: string | undefined, objeto?: any): Promise<any> {
		return Promise.resolve();
	}

	delete(url?: string | undefined, id?: any): Promise<any> {
		return Promise.resolve();
	}

	put(url?: string | undefined, id?: any): Promise<any> {
		return Promise.resolve();
	}
}
