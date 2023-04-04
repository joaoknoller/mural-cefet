export default interface HTTP {
	get(url?: string): Promise<any>;

	post(url?: string, objeto?: any): Promise<any>;

	delete(url: string, id: number): Promise<any>;

	put(url: string, objeto: any): Promise<any>;
}
