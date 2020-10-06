import { Module } from '@nestjs/common';
import { VehiclesService } from './providers/vehicles.service';
import { VehiclesController } from './controllers/vehicles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Vehicle, VehicleShema } from './schema/vehicle.schema';

@Module({
	imports: [MongooseModule.forFeature([{ name: Vehicle.name, schema: VehicleShema }])],
	providers: [VehiclesService],
    controllers: [VehiclesController]
})
export class VehicleModule {}
