import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from './schema/user.schema';
import { UsersService } from './providers/users.service';
import { UsersController } from './controllers/users.controller';
import { UsersRepository } from './providers/users.repository.service';

@Module({
	imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
	providers: [UsersService, UsersRepository],
	exports: [UsersService],
	controllers: [UsersController]
})
export class UsersModule {}
