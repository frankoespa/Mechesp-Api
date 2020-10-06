import { Injectable } from '@nestjs/common';
import { InjectModel,  } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RepositoryBase } from '../../global/base/RepositoryBase';
import { UserDomain } from '../../global/domains/UserDomain';
import { User } from '../schema/user.schema';

@Injectable()
export class UsersRepository extends RepositoryBase<User, UserDomain> {
	constructor(@InjectModel(User.name) userModel: Model<User>) {
		super(userModel, UserDomain);
	}

	async FindWithEmail(email: string): Promise<UserDomain> {
		const doc = await this.model
			.findOne({
				Email: email
			})
			.exec();

		return doc ? new UserDomain(doc) : null;
	}

	async FindWithFirebaseId(firebaseUid: string): Promise<UserDomain> {
		const doc = await this.model
			.findOne({
				Id_Firebase: firebaseUid
			})
			.exec();

		return doc ? new UserDomain(doc) : null;
	}
}
