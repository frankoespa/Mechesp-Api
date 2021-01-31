import { Document, Schema as MongooseSchema } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../../role/schema/RoleSchema';
@Schema({
	minimize: false,
	timestamps: true
})
export class User extends Document {
	@Prop()
	Nombre: string;

	@Prop({ type: MongooseSchema.Types.Number, ref: Role.name, autopopulate: true })
	Role: Role;

	@Prop()
	Email: string;

	@Prop()
	Tel: string;

	@Prop()
	Dni: number;

	@Prop()
	Direccion: string;

	@Prop()
	Localidad: string;

	@Prop()
	FirebaseID: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
