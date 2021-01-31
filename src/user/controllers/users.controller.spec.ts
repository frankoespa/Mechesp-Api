import { CanActivate } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { AuthGuard } from '../../auth/guards/AuthGuard';
import { RolesGuard } from '../../global/guards/roles.guard';
import { UserService } from '../providers/UserService';
import { UserController } from './UserController';
import { CreateUserCommand } from '../commands/CreateUserCommand';
import { User } from '../schema/UserSchema';

type usersServiceMOCKType = {
	CreateCustomer: jest.Mock<Promise<User>, [CreateUserCommand]>;
};

describe('UsersController', () => {
	let target: UserController;
	let usersServiceMOCK: usersServiceMOCKType = {
		CreateCustomer: jest.fn().mockImplementation(() => Promise.resolve(new User()))
	};
	const authGuardMOCK: CanActivate = {
		canActivate: jest.fn(() => true)
	};
	const rolesGuardMOCK: CanActivate = {
		canActivate: jest.fn(() => true)
	};
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			providers: [
				{
					provide: UserService,
					useFactory: jest.fn(() => usersServiceMOCK)
				}
			]
		})
			.overrideGuard(AuthGuard)
			.useValue(authGuardMOCK)
			.overrideGuard(RolesGuard)
			.useValue(rolesGuardMOCK)
			.compile();

		target = await module.get<UserController>(UserController);
		usersServiceMOCK = await module.get(UserService);

		//Clean
		usersServiceMOCK.CreateCustomer.mockClear();
	});

	describe('Create_Method', () => {
		const createUserCustomerDTO: CreateUserDTO = {
			Email: 'francoesparza@gmail.com',
			Nombre: 'Franco'
		};

		it('UsersController should be defined', () => {
			//Assert
			expect(target).toBeDefined();
		});

		it('Calls CreateCustomer method of UsersService once time', () => {
			//Action
			target.Create(createUserCustomerDTO);

			//Assert
			expect(usersServiceMOCK.CreateCustomer).toHaveBeenCalledTimes(1);
		});

		it('Calls CreateCustomer method of UsersService with CreateUserCustomerCommand parameter type', () => {
			//Action
			target.Create(createUserCustomerDTO);

			//Assert
			expect(usersServiceMOCK.CreateCustomer.mock.calls[0][0]).toBeInstanceOf(CreateUserCommand);
		});

		it('Calls CreateCustomer method of UsersService with values expected', () => {
			//Action
			target.Create(createUserCustomerDTO);

			//Assert
			expect(usersServiceMOCK.CreateCustomer.mock.calls[0][0]).toEqual(createUserCustomerDTO);
		});
	});
});
