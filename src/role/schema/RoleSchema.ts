import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
	minimize: false
    
})
export class Role extends Document {
	@Prop()
	_id: number;

	@Prop({ default: null })
	Description: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
