import { Injectable } from '@nestjs/common';
import { User } from '../schema/user.schema';
import { ValidationException } from '../../global/exceptions/ExceptionValidation';
import { UsersRepository } from './users.repository.service';
import { DocumentFactoryService } from '../../utils/providers/documentFactory.service';
import { LinkCustomerCommand } from '../../global/commands/users/LinkCustomerCommand';
import { CreateUserAdminCommand } from '../../global/commands/users/CreateUserAdminCommand';
import { UserDomain } from '../../global/domains/UserDomain';
import { CreateUserCustomerCommand } from '../../global/commands/users/CreateUserCustomerCommand';
import { IUsersService } from './interfaces/IUsersService';

@Injectable()
export class UsersService implements IUsersService {
	constructor(private readonly usersRepository: UsersRepository, private readonly documentFactoryService: DocumentFactoryService) {}

	async CreateCustomer(createUserCustomerCommand: CreateUserCustomerCommand): Promise<User> {
		if (await this.usersRepository.FindWithEmail(createUserCustomerCommand.Email))
			throw new ValidationException('Ya existe un usuario con el email ingresado');

		const newCustomer = await this.documentFactoryService.Create(User.name, UserDomain);

		newCustomer.SetCustomer(createUserCustomerCommand);

		return await newCustomer.Save();
	}

	async CreateFirstAdmin(createUserAdminCommand: CreateUserAdminCommand): Promise<User> {
		const newUserAdmin = this.documentFactoryService.Create(User.name, UserDomain);
		newUserAdmin.SetAdmin(createUserAdminCommand);
		return await newUserAdmin.Save();
	}

	async LinkCustomer(linkCustomerCommand: LinkCustomerCommand): Promise<User> {
		const user = await this.usersRepository.FindWithEmail(linkCustomerCommand.Email);

		if (!user) {
			throw new ValidationException('No existe Usuario con ese email');
		}

		user.LinkCustomer(linkCustomerCommand);

		return await user.Save();
	}
}
