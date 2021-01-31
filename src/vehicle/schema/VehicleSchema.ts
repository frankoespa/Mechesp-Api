import { Document, Schema as MongooseSchema } from 'mongoose';
import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { User } from "../../user/schema/UserSchema";

@Schema({
	minimize: false,
	timestamps: true
})
export class Vehicle extends Document {
	@Prop()
	Patente: string;

	@Prop([{ type: MongooseSchema.Types.ObjectId, ref: User.name, autopopulate: true }])
	Users?: User[];
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);