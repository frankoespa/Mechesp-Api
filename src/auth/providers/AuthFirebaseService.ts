import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as FirebaseAdmin from 'firebase-admin';
import { admin } from 'firebase-admin/lib/auth';
import { Messages } from '../../global/messages/Messages';
import { Roles } from '../../role/enums/Roles';

@Injectable()
export class AuthFirebaseService {
	private Auth: admin.auth.Auth;

	constructor() {
		this.Auth = FirebaseAdmin.initializeApp({
            
			credential: FirebaseAdmin.credential.applicationDefault()
		}).auth();
		// this.Admin.auth().setCustomUserClaims('01NpJuQlr5fwu79CERHm5VkoVYi2',{role: 'admin'}).then(c => console.log('Custom claims added'));
		// this.Admin.auth().getUser('01NpJuQlr5fwu79CERHm5VkoVYi2').then(u => console.log(u))
	}

	async VerifyToken(token: string): Promise<admin.auth.DecodedIdToken> {
		return await this.Auth.verifyIdToken(token).catch(() => {
			throw new UnauthorizedException(Messages.TokenInvalido);
		});
	}

	async SetCustomUserClaims(firebaseUid: string, customUserClaims: { role: Roles }): Promise<void> {
		return await this.Auth.setCustomUserClaims(firebaseUid, customUserClaims);
	}

	async DeleteUser(firebaseUid: string): Promise<void> {
		return await this.Auth.deleteUser(firebaseUid);
	}

	async ListUsers(): Promise<admin.auth.ListUsersResult> {
		return await this.Auth.listUsers();
	}

	async CreateUser(properties: admin.auth.CreateRequest): Promise<admin.auth.UserRecord> {
		return await this.Auth.createUser(properties);
	}
}
