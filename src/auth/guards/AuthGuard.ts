import { CanActivate, ExecutionContext, UnauthorizedException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthFirebaseService } from '../providers/AuthFirebaseService';
import { UserRepository } from '../../user/providers/UserRepository';
import { KeyRole, Roles } from '../../role/enums/Roles';
import { IRequestWithUser } from '../../global/base/interfaces/IRequestWithUser';
import { Messages } from '../../global/messages/Messages';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private reflector: Reflector, private authFirebaseService: AuthFirebaseService, private usersRepository: UserRepository) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const ctx = context.switchToHttp();

		const request = ctx.getRequest<IRequestWithUser>();

		if (!request.headers['authorization']) {
			throw new UnauthorizedException(Messages.NoExisteToken);
		}

		// Authorization: Bearer ---Token---
		const firebaseTokenUser = request.headers['authorization'].split(' ')[1];

		const decodedTokenUser = await this.authFirebaseService.VerifyToken(firebaseTokenUser);

		const user = await this.usersRepository.FindWithFirebaseId(decodedTokenUser.uid);

		if (!user) throw new UnauthorizedException(Messages.NoExisteElUsuarioEnLaDb(decodedTokenUser.email));

		request.user = user;

		const rolesFromMetadataMethod: Roles[] = this.reflector.get<Roles[]>(KeyRole, context.getHandler());

		if (!rolesFromMetadataMethod.length) return true;

		if (rolesFromMetadataMethod.some((role) => user.Doc.Role._id == role)) return true;

		throw new UnauthorizedException(Messages.UsuarioNoAutorizado(request.url));
	}
}
