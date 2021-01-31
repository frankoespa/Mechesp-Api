import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
	minimize: false
})
export class NotificationMail extends Document {
	@Prop()
	_id: number;

    @Prop()
    Sender: string

	@Prop({ default: null })
	Subject: string;

	@Prop({ default: null })
	NroTemplate: number;
}

export const NotificationMailSchema = SchemaFactory.createForClass(NotificationMail);