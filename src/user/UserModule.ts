import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from './schema/UserSchema';
import { UserService } from './providers/UserService';
import { UserController } from './controllers/UserController';
import { UserRepository } from './providers/UserRepository';
import { AuthModule } from '../auth/AuthModule';

@Global()
@Module({
	imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), AuthModule],
	providers: [UserService, UserRepository],
	exports: [UserService, UserRepository],
	controllers: [UserController]
})
export class UserModule {}
