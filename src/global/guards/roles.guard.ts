import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { KeyRole, Roles } from '../enums/Roles';
import { AuthService } from '../../auth/providers/auth.service';
import { RequestWithUser } from '../interfaces/RequestWithUser';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector, private authService: AuthService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		console.log('Roles');

		const ctx = context.switchToHttp();
		const {
			user: { rol }
		} = ctx.getRequest<RequestWithUser>();

		const rolFromMetadataMethod: Roles = this.reflector.get<Roles>(KeyRole, context.getHandler());

		if (rolFromMetadataMethod == Roles.All) return true;

		if (rol == rolFromMetadataMethod) return true;

		throw new UnauthorizedException('Usuario no autorizado');
	}
}
