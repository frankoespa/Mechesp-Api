import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mailjet from 'node-mailjet';
import { Config } from '../../global/config/Configuration';
import { DocumentLoaderService } from '../../shared/providers/DocumentLoaderService';
import { NotificationMailDomain } from '../domain/NotificationMailDomain';
import { TemplatesMail } from '../enums/TemplatesMail';
import { ISendPassForMail } from '../interfaces/ISendPassForMail';
import { NotificationMail } from '../schemas/NotificationMailSchema';

@Injectable()
export class EmailSenderService {
	private mailjetClient: mailjet.Email.Client;

	constructor(private readonly configService: ConfigService, private readonly documentLoaderService: DocumentLoaderService) {
		this.mailjetClient = mailjet.connect(this.configService.get(Config.MAILJET_KEY), this.configService.get(Config.MAILJET_SECRET_KEY));
	}

	async SendPassword(sendPassForMail: ISendPassForMail): Promise<mailjet.Email.PostResponse> {
		const notificationMailDomain = await this.documentLoaderService.GetById(
			NotificationMail.name,
			NotificationMailDomain,
			TemplatesMail.SendPassword
		);

		return await this.Send(notificationMailDomain, sendPassForMail.Variables, sendPassForMail.Recipient);
	}

	private async Send(
		notificationMailDomain: NotificationMailDomain,
		variables: Record<string, string>,
		recipient: string
	): Promise<mailjet.Email.PostResponse> {
		return await this.mailjetClient.post('send', { version: 'v3.1' }).request({
			Messages: [
				{
					From: {
						Email: notificationMailDomain.Doc.Sender
					},
					To: [
						{
							Email: recipient
						}
					],
					Variables: variables,
					TemplateID: notificationMailDomain.Doc.NroTemplate,
					TemplateLanguage: true,
					Subject: notificationMailDomain.Doc.Subject
				}
			]
		});
	}
}
