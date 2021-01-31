import { User } from 'src/user/schema/UserSchema';
import { DomainBase } from '../../global/base/domain/DomainBase';
import { CreateUserVO } from '../valueObjects/CreateUserVO';

export class UserDomain extends DomainBase<User> {
	CreateNew(createUserVO: CreateUserVO): void {
		this.doc.Email = createUserVO.Email;
		this.doc.Nombre = createUserVO.Nombre;
		this.doc.Role = createUserVO.Role.Doc;
		this.doc.FirebaseID = createUserVO.FirebaseID;
		this.doc.Dni = createUserVO.Dni;
		this.doc.Direccion = createUserVO.Direccion;
        this.doc.Localidad = createUserVO.Localidad;
        this.doc.Tel = createUserVO.Tel
	}
}
