import { Controller, Get } from '@nestjs/common';
import { ValidationException } from '../../global/base/exceptions/ExceptionValidation';
import { VehicleService } from '../providers/VehicleService';
import { Vehicle } from '../schema/VehicleSchema';

@Controller('vehicles')
export class VehicleController {
	constructor(private readonly vehiclesService: VehicleService) {}

	@Get()
	async create(): Promise<number> {
        // return await this.vehiclesService.create();
        // return 5;
        throw new ValidationException('El mensaje de error');
	}
}
