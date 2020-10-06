import { Document, Schema as MongooseSchema } from 'mongoose';
import { Roles } from '../../global/enums/Roles';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Vehicle } from '../../vehicles/schema/vehicle.schema';

@Schema({
	minimize: false,
	timestamps: true
})
export class User extends Document {
	@Prop({ required: true })
	Rol: Roles;

	@Prop({ required: true })
	Nombre: string;

	@Prop({ required: true })
	Email: string;

	@Prop({ default: null })
	Tel?: string;

	@Prop({ default: null })
	Dni?: number;

	@Prop({ default: null })
	Calle?: string;

	@Prop({ default: null })
	Nro?: number;

	@Prop({ default: null })
	Localidad?: string;

	@Prop({ default: null })
	Id_Firebase?: string;

	@Prop({default: null})
	CodigoVinculacion?: string;

	@Prop([{ type: MongooseSchema.Types.ObjectId, ref: Vehicle.name, autopopulate: true }])
	Vehiculos?: Vehicle[];
}

export const UserSchema = SchemaFactory.createForClass(User);
