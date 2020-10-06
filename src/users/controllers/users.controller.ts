import { Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUserCustomerDTO } from '../../auth/dto/CreateUserDTO';
import { CreateUserCustomerCommand } from '../../global/commands/users/CreateUserCustomerCommand';
import { Authorization } from '../../global/decorators/roles.decorator';
import { Roles } from '../../global/enums/Roles';
import { AuthGuard } from '../../global/guards/auth.guard';
import { RolesGuard } from '../../global/guards/roles.guard';
import { Mapper } from '../../global/Mapper';
import { UsersService } from '../providers/users.service';
import { User } from '../schema/user.schema';

@Controller('users')
@UseGuards(AuthGuard)
@UseGuards(RolesGuard)
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@Authorization(Roles.Admin)
	async Create(createUserDto: CreateUserCustomerDTO): Promise<User> {
		const command = new Mapper(createUserDto, CreateUserCustomerCommand).Map();
		return await this.usersService.CreateCustomer(command);
	}
}
