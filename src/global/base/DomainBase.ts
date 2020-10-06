import { Document } from 'mongoose';

export abstract class DomainBase<T extends Document> {
	protected doc: T;

	constructor(document: T) {
		this.doc = document;
	}

	async Save(): Promise<T> {
		return await this.doc.save();
	}
}
