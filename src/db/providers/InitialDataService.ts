import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { NotificationMail } from '../../notifications/schemas/NotificationMailSchema';
import { Role } from '../../role/schema/RoleSchema';
import { NotificationMailInitialData } from '../initialData/NotificationMailInitialData';
import { RolesInitialData } from '../initialData/RolesInitialData';

@Injectable()
export class InitialDataService {
	constructor(@InjectConnection() private connection: Connection) {}

	async Initialize(): Promise<void> {
        await this.InitializeRoles();
        await this.InitializeNotificationMailInitial()
	}

	private async InitializeRoles() {
		const RoleModel: Model<Role> = this.connection.model(Role.name);

		await RoleModel.deleteMany({}).exec();

		await RoleModel.create(RolesInitialData);
	}

	private async InitializeNotificationMailInitial() {
		const NotificationMailModel: Model<NotificationMail> = this.connection.model(NotificationMail.name);

		await NotificationMailModel.deleteMany({}).exec();

		await NotificationMailModel.create(NotificationMailInitialData);
	}
}
