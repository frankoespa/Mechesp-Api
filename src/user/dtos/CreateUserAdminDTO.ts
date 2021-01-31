import { Roles } from 'src/role/enums/Roles';

export class CreateUserAdminDTO {
	Email: string;
	Nombre: string;
	Rol: Roles;
	Id_Firebase: string;
}
