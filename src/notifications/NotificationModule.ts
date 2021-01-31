import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailSenderService } from './providers/EmailSenderService';
import { NotificationMail, NotificationMailSchema } from './schemas/NotificationMailSchema';

@Module({
	imports: [MongooseModule.forFeature([{ name: NotificationMail.name, schema: NotificationMailSchema }])],
	providers: [EmailSenderService]
})
export class NotificationModule {}
