export class Mapper<S, T> {
	constructor(private readonly source: S, private readonly typeTarget: new () => T) {}

	Map(): T {
		return Object.assign<T, S>(new this.typeTarget(), this.source);
	}
}
