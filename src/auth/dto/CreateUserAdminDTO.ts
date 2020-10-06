import { Roles } from 'src/global/enums/Roles';

export class CreateUserAdminDTO {
	Email: string;
	Nombre: string;
	Rol: Roles;
	Id_Firebase: string;
}
