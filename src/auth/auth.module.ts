import { Global, Module } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { AuthController } from './controllers/auth.controller';
import { AuthFirebaseAdminService } from './providers/authFirebaseAdmin.service';
import { UsersModule } from '../users/users.module';

@Global()
@Module({
	imports: [UsersModule],
	providers: [AuthService, AuthFirebaseAdminService],
	exports: [AuthService],
	controllers: [AuthController]
})
export class AuthModule {}
