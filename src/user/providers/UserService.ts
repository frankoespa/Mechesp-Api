import { Injectable } from '@nestjs/common';
import { User } from '../schema/UserSchema';
import { ValidationException } from '../../global/base/exceptions/ExceptionValidation';
import { UserRepository } from './UserRepository';
import { DocumentLoaderService } from '../../shared/providers/DocumentLoaderService';
import { UserDomain } from '../domain/UserDomain';
import { CreateUserCommand } from '../commands/CreateUserCommand';
import { IUsersService } from './interfaces/IUsersService';
import { AuthFirebaseService } from '../../auth/providers/AuthFirebaseService';
import { Roles } from '../../role/enums/Roles';
import { RandomCodeService } from '../../shared/providers/RandomCodeService';
import { CreateUserVO } from '../valueObjects/CreateUserVO';
import { Role } from '../../role/schema/RoleSchema';
import { RoleDomain } from '../../role/domain/RoleDomain';
import { EmailSenderService } from '../../notifications/providers/EmailSenderService';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService implements IUsersService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly documentLoaderService: DocumentLoaderService,
		private readonly authFirebaseService: AuthFirebaseService,
		private readonly randomCodeService: RandomCodeService,
		private readonly emailSenderService: EmailSenderService,
        @InjectModel(User.name) private readonly userModel: Model<User>
	) {}

	async Create(createUserCommand: CreateUserCommand): Promise<void> {

		if (await this.userRepository.FindWithEmail(createUserCommand.Email))
			throw new ValidationException('Ya existe un usuario con el email ingresado');

		const newPassword = this.randomCodeService.Generate();

		const newUserFirebase = await this.authFirebaseService.CreateUser({
			email: createUserCommand.Email,
			password: newPassword
		});

		await this.authFirebaseService.SetCustomUserClaims(newUserFirebase.uid, { role: createUserCommand.RoleID });

		const newUserDomain = await this.documentLoaderService.Create(User.name, UserDomain);

		const createUserVO = new CreateUserVO();
		createUserVO.Email = createUserCommand.Email;
		createUserVO.Nombre = createUserCommand.Nombre;
		createUserVO.Role = await this.documentLoaderService.GetById(Role.name, RoleDomain, createUserCommand.RoleID);
		createUserVO.FirebaseID = newUserFirebase.uid;
		createUserVO.Dni = createUserCommand.Dni;
		createUserVO.Direccion = createUserCommand.Direccion;
		createUserVO.Localidad = createUserCommand.Localidad;
		createUserVO.Tel = createUserCommand.Tel;

		newUserDomain.CreateNew(createUserVO);

		const userCreated = await newUserDomain.Save();

		await this.emailSenderService.SendPassword({
			Recipient: userCreated.Email,
			Variables: {
				name: userCreated.Nombre,
				password: newPassword
			}
		});
	}

	async CreateFirstAdminUser(): Promise<User> {
		const allFirebaseUsers = (await this.authFirebaseService.ListUsers()).users;

		if (allFirebaseUsers.length != 0) {
			return;
		}

		const newUserAdmin = await this.authFirebaseService.CreateUser({
			email: 'mecanicalresparza@gmail.com',
			password: '123456'
		});

		await this.authFirebaseService.SetCustomUserClaims(newUserAdmin.uid, { role: Roles.Admin });

		const newUserAdminDomain = this.documentLoaderService.Create(User.name, UserDomain);

		const createUserVO = new CreateUserVO();

		createUserVO.Email = 'mecanicalresparza@gmail.com';
		createUserVO.Nombre = 'Mecanica Esparza';
		createUserVO.Role = await this.documentLoaderService.GetById(Role.name, RoleDomain, Roles.Admin);
		createUserVO.FirebaseID = newUserAdmin.uid;
		createUserVO.Dni = null;
		createUserVO.Direccion = 'Lamadrid 2424';
		createUserVO.Localidad = '';
		createUserVO.Tel = '';

		newUserAdminDomain.CreateNew(createUserVO);

		return await newUserAdminDomain.Save();
	}
}
