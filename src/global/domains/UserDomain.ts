import { User } from 'src/users/schema/user.schema';
import { DomainBase } from '../base/DomainBase';
import { CreateUserAdminCommand } from '../commands/users/CreateUserAdminCommand';
import { CreateUserCustomerCommand } from '../commands/users/CreateUserCustomerCommand';
import { LinkCustomerCommand } from '../commands/users/LinkCustomerCommand';
import { ValidationException } from '../exceptions/ExceptionValidation';

export class UserDomain extends DomainBase<User> {
	SetAdmin(createUserAdminCommand: CreateUserAdminCommand): void {
		this.doc.Email = createUserAdminCommand.Email;
		this.doc.Nombre = createUserAdminCommand.Nombre;
		this.doc.Rol = createUserAdminCommand.Rol;
		this.doc.Id_Firebase = createUserAdminCommand.Id_Firebase;
	}

    SetCustomer(createUserCustomerCommand: CreateUserCustomerCommand): void {
        this.doc.Email = createUserCustomerCommand.Email;
        this.doc.Nombre = createUserCustomerCommand.Nombre
    }

	LinkCustomer(linkCustomerCommand: LinkCustomerCommand): void {
		if (this.doc.CodigoVinculacion == linkCustomerCommand.CodigoVinculacion) {
			this.doc.Id_Firebase = linkCustomerCommand.Id_Firebase;
		} else {
			throw new ValidationException('Código de vinculación incorrecto');
		}
	}
}
