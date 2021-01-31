import { RoleDomain } from "../../role/domain/RoleDomain";

export class CreateUserVO {
    Nombre: string;

	Role: RoleDomain;

	Email: string;

	Tel: string;

	Dni: number;

	Direccion: string;

	Localidad: string;

	FirebaseID: string;
}