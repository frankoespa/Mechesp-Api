import { Global, Module } from '@nestjs/common';
import { DocumentLoaderService } from './providers/DocumentLoaderService';
import { EmailSenderService } from '../notifications/providers/EmailSenderService';
import { RandomCodeService } from './providers/RandomCodeService';

@Global()
@Module({
	providers: [DocumentLoaderService, RandomCodeService, EmailSenderService],
	exports: [DocumentLoaderService, RandomCodeService, EmailSenderService]
})
export class SharedModule {}
