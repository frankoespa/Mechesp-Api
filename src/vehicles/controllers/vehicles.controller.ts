import { Controller, Get } from '@nestjs/common';
import { VehiclesService } from '../providers/vehicles.service';
import { Vehicle } from '../schema/vehicle.schema';

@Controller('vehicles')
export class VehiclesController {
	constructor(private readonly vehiclesService: VehiclesService) {}

	@Get()
	async create(): Promise<Vehicle> {
		return await this.vehiclesService.create();
	}
}
