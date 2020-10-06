import { Injectable } from '@nestjs/common';
import { admin } from 'firebase-admin/lib/auth';
import { UsersService } from '../../users/providers/users.service';
import { Roles } from '../../global/enums/Roles';
import { User } from '../../users/schema/user.schema';
import { AuthFirebaseAdminService } from './authFirebaseAdmin.service';
import { LinkCustomerCommand } from '../../global/commands/users/LinkCustomerCommand';

@Injectable()
export class AuthService {
	constructor(private readonly usersService: UsersService, private readonly authFirebaseAdminService: AuthFirebaseAdminService) {}

	async VerifyToken(token: string): Promise<admin.auth.DecodedIdToken> {
		return await this.authFirebaseAdminService.verifyIdToken(token);
	}

	async LinkCustomer(linkCustomerCommand: LinkCustomerCommand): Promise<User> {
		try {
			await this.authFirebaseAdminService.setCustomUserClaims(linkCustomerCommand.Id_Firebase, { rol: Roles.Customer });

			return await this.usersService.LinkCustomer(linkCustomerCommand);
		} catch (error) {
			await this.authFirebaseAdminService.deleteUser(linkCustomerCommand.Id_Firebase);
			throw error;
		}
	}

	async CreateFirstAdminUser(): Promise<User> {
		const allFirebaseUsers = (await this.authFirebaseAdminService.listUsers()).users;
		if (allFirebaseUsers.length != 0) {
			return;
		}

		const newUserAdmin = await this.authFirebaseAdminService.createUser({
			email: 'mecanicalresparza@gmail.com',
			password: '123456'
		});

		try {
			await this.authFirebaseAdminService.setCustomUserClaims(newUserAdmin.uid, { rol: Roles.Admin });

			return await this.usersService.CreateFirstAdmin({
				Email: 'mecanicalresparza@gmail.com',
				Nombre: 'Mecanica Esparza',
				Id_Firebase: newUserAdmin.uid,
				Rol: Roles.Admin
			});
		} catch (error) {
			await this.authFirebaseAdminService.deleteUser(newUserAdmin.uid);
			throw error;
		}
	}
}
