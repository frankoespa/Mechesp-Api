import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Vehicle } from '../schema/VehicleSchema';
import { Model } from 'mongoose';

@Injectable()
export class VehicleService {
    constructor(@InjectModel(Vehicle.name) private vehicleModel: Model<Vehicle>) { }
    
    async create(): Promise<Vehicle> {
        return await this.vehicleModel.create({
            Patente: 'EJE142'
        })
    }
}
