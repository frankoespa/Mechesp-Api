import { Document, Model } from 'mongoose';
import { DomainBase } from './DomainBase';

export abstract class RepositoryBase<T extends Document, D extends DomainBase<T>> {
	constructor(protected readonly model: Model<T>, private readonly typeDomain: new (document: T) => D) {}

	async FindWithId(id: string): Promise<D> {
		const doc = await this.model.findById(id).exec();
		return doc ? new this.typeDomain(doc) : null;
	}
}
