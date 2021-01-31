import { Module } from '@nestjs/common';
import { VehicleService } from './providers/VehicleService';
import { VehicleController } from './controllers/VehicleController';
import { MongooseModule } from '@nestjs/mongoose';
import { Vehicle, VehicleSchema } from './schema/VehicleSchema';

@Module({
	imports: [MongooseModule.forFeature([{ name: Vehicle.name, schema: VehicleSchema }])],
	providers: [VehicleService],
    controllers: [VehicleController]
})
export class VehicleModule {}
