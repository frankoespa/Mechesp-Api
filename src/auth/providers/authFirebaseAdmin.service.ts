import { Injectable } from "@nestjs/common";
import * as FirebaseAdmin from 'firebase-admin';
import { admin } from 'firebase-admin/lib/auth';
import { Roles } from '../..//global/enums/Roles';

@Injectable()
export class AuthFirebaseAdminService {
	private Auth: admin.auth.Auth;

	constructor() {
		this.Auth = FirebaseAdmin.initializeApp({
			credential: FirebaseAdmin.credential.applicationDefault()
		}).auth();
		// this.Admin.auth().setCustomUserClaims('01NpJuQlr5fwu79CERHm5VkoVYi2',{role: 'admin'}).then(c => console.log('Custom claims added'));
		// this.Admin.auth().getUser('01NpJuQlr5fwu79CERHm5VkoVYi2').then(u => console.log(u))
	}

	async verifyIdToken(token: string): Promise<admin.auth.DecodedIdToken> {
		return await this.Auth.verifyIdToken(token);
	}

	async setCustomUserClaims(firebaseUid: string, customUserClaims: { rol: Roles }): Promise<void> {
		return await this.Auth.setCustomUserClaims(firebaseUid, customUserClaims);
	}

	async deleteUser(firebaseUid: string): Promise<void> {
		return await this.Auth.deleteUser(firebaseUid);
	}

	async listUsers(): Promise<admin.auth.ListUsersResult> {
		return await this.Auth.listUsers();
	}

	async createUser(properties: admin.auth.CreateRequest): Promise<admin.auth.UserRecord> {
		return await this.Auth.createUser(properties);
	}
}