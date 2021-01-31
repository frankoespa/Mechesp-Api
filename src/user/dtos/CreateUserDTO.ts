import { OptionalInt } from '../../global/base/validations/OptionalInt';
import { OptionalString } from '../../global/base/validations/OptionalString';
import { RequiredEmail } from '../../global/base/validations/RequiredEmail';
import { RequiredEnum } from '../../global/base/validations/RequiredEnum';
import { RequiredString } from '../../global/base/validations/RequiredString';
import { Roles } from '../../role/enums/Roles';

export class CreateUserDTO {
	@RequiredString()
	readonly Nombre: string;

	@RequiredEnum(Roles)
	readonly RoleID: Roles;

	@RequiredEmail()
	readonly Email: string;

	@OptionalString()
	readonly Tel: string;

	@OptionalInt()
	readonly Dni: number;

	@OptionalString()
	readonly Direccion: string;

	@OptionalString()
	readonly Localidad: string;
}
