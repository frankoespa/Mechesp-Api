import { CanActivate } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserCustomerDTO } from '../../auth/dto/CreateUserDTO';
import { AuthGuard } from '../../global/guards/auth.guard';
import { RolesGuard } from '../../global/guards/roles.guard';
import { UsersService } from '../providers/users.service';
import { UsersController } from './users.controller';
import { CreateUserCustomerCommand } from '../../global/commands/users/CreateUserCustomerCommand';
import { User } from '../schema/user.schema';

type usersServiceMOCKType = {
	CreateCustomer: jest.Mock<Promise<User>, [CreateUserCustomerCommand]>;
};

describe('UsersController', () => {
	let target: UsersController;
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
			controllers: [UsersController],
			providers: [
				{
					provide: UsersService,
					useFactory: jest.fn(() => usersServiceMOCK)
				}
			]
		})
			.overrideGuard(AuthGuard)
			.useValue(authGuardMOCK)
			.overrideGuard(RolesGuard)
			.useValue(rolesGuardMOCK)
			.compile();

		target = await module.get<UsersController>(UsersController);
		usersServiceMOCK = await module.get(UsersService);

		//Clean
		usersServiceMOCK.CreateCustomer.mockClear();
	});

	describe('Create_Method', () => {
		const createUserCustomerDTO: CreateUserCustomerDTO = {
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
			expect(usersServiceMOCK.CreateCustomer.mock.calls[0][0]).toBeInstanceOf(CreateUserCustomerCommand);
		});

		it('Calls CreateCustomer method of UsersService with values expected', () => {
			//Action
			target.Create(createUserCustomerDTO);

			//Assert
			expect(usersServiceMOCK.CreateCustomer.mock.calls[0][0]).toEqual(createUserCustomerDTO);
		});
	});
});
