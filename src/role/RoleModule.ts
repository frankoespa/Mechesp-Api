import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleService } from './providers/RoleService';
import { RoleController } from './controllers/RoleController';
import { Role, RoleSchema } from './schema/RoleSchema';
import { RoleRepository } from './providers/RoleRepository';

@Module({
    imports: [MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }])],
    providers: [RoleService, RoleRepository],
	controllers: [RoleController]
})
export class RoleModule {}
