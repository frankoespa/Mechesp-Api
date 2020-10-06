import { Global, Module } from '@nestjs/common';
import { DocumentFactoryService } from './providers/documentFactory.service';

@Global()
@Module({
	providers: [DocumentFactoryService],
	exports: [DocumentFactoryService]
})
export class UtilsModule {}
