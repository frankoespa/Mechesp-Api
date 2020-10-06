import { Controller, Post, Req, Body, UseGuards } from '@nestjs/common';
import { AuthService } from '../providers/auth.service';
import { RequestWithUser } from '../../global/interfaces/RequestWithUser';
import { LinkCustomerDTO } from '../dto/LinkCustomerDto';
import { Mapper } from '../../global/Mapper';
import { LinkCustomerCommand } from '../../global/commands/users/LinkCustomerCommand';
import { AuthGuard } from '../../global/guards/auth.guard';

@Controller('auth')
@UseGuards(AuthGuard)
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('/linkCustomer')
    async linkCustomer(@Req() req: RequestWithUser, @Body() linkCustomerDto: LinkCustomerDTO): Promise<void> {
        
        const command = new Mapper(linkCustomerDto, LinkCustomerCommand).Map();

        command.Id_Firebase = req.user.uid;

		await this.authService.LinkCustomer(command);
	}
}
