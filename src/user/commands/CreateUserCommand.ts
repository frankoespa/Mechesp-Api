import { Roles } from '../../role/enums/Roles';

export class CreateUserCommand {
	Nombre: string;

	RoleID: Roles;

	Email: string;

	Tel: string;

	Dni: number;

	Direccion: string;

	Localidad: string;
}
