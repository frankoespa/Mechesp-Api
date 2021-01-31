import { Module } from '@nestjs/common';
import { AuthFirebaseService } from './providers/AuthFirebaseService';

@Module({
	imports: [],
	providers: [AuthFirebaseService],
	exports: [AuthFirebaseService]
})
export class AuthModule {}
