import { CanActivate, ExecutionContext, UnauthorizedException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../../auth/providers/auth.service';
import { RequestWithUser } from '../interfaces/RequestWithUser';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private reflector: Reflector, private authService: AuthService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		console.log('Auth');
		const ctx = context.switchToHttp();
		const request = ctx.getRequest<RequestWithUser>();

		if (!request.headers['authorization']) {
			throw new UnauthorizedException('Usuario no autorizado, no existe token en la petición');
		}

		// Authorization: Bearer ---Token---
		const firebaseTokenUser = request.headers['authorization'].split(' ')[1];

		try {
			const decodedTokenUser = await this.authService.VerifyToken(firebaseTokenUser);
			request.user = {
				uid: decodedTokenUser.uid,
				rol: decodedTokenUser.rol
			};
			return true;
		} catch (error) {
			throw new UnauthorizedException('Usuario no autorizado, token inválido');
		}
	}
}
