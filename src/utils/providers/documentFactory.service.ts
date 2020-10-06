import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Document, Model } from 'mongoose';
import { DomainBase } from 'src/global/base/DomainBase';

@Injectable()
export class DocumentFactoryService {
	constructor(@InjectConnection() private connection: Connection) {}

	Create<T extends Document, D extends DomainBase<T>>(nameModel: string, type: new (document: T) => D): D {
		const T_Model: Model<T> = this.connection.model(nameModel);
		const document = new T_Model();
		return new type(document);
	}
}
