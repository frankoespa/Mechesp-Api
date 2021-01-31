import { applyDecorators, UseGuards } from '@nestjs/common';
import { Authorization } from '../../role/decorators/RoleDecorator';
import { Roles } from '../../role/enums/Roles';
import { AuthGuard } from '../guards/AuthGuard';

export function Auth(
	roles: Roles[]
): <TFunction extends () => void, Y>(
	target: Record<string, any> | TFunction,
	propertyKey?: string | symbol,
	descriptor?: TypedPropertyDescriptor<Y>
) => void {
	return applyDecorators(Authorization(roles), UseGuards(AuthGuard));
}
