import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { CreateUserCommand } from '../commands/CreateUserCommand';
import { Roles } from '../../role/enums/Roles';
import { Mapper } from '../../global/base/Mapper';
import { UserService } from '../providers/UserService';
import { Auth } from '../../auth/decorators/AuthComposition';


@Controller('users')
export class UserController {
	constructor(private readonly usersService: UserService) {}

	@Post('create')
    // @Auth([Roles.Admin])
	async Create(@Body() createUserDto: CreateUserDTO): Promise<void> {
        const command = new Mapper(createUserDto, CreateUserCommand).Map();
		// return await this.usersService.Create(command)
	}
}
