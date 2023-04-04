import HTTP from './http';

export default class HTTPFalso implements HTTP {
	get(): Promise<any> {
		return Promise.resolve([]);
	}
}
