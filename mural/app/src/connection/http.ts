export default interface HTTP {
	get(url?: string): Promise<any>;
}
