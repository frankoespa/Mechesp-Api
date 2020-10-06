import { Roles } from "src/global/enums/Roles";

export class CreateUserAdminCommand {
	Email: string;
	Nombre: string;
	Rol: Roles;
	Id_Firebase: string;
}
