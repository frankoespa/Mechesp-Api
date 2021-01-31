import { CreateQuery } from 'mongoose';
import { NotificationMail } from '../../notifications/schemas/NotificationMailSchema';

export const NotificationMailInitialData: CreateQuery<NotificationMail>[] = [
			{
				_id: 1,
				Sender: 'frankoespa@gmail.com',
				NroTemplate: 2122644,
				Subject: 'Tu Password'
			}
		];
