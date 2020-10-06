import { Document } from "mongoose";
import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";

@Schema()
export class Vehicle extends Document {

    @Prop()
    Patente: string

}

export const VehicleShema = SchemaFactory.createForClass(Vehicle);