import { Injectable } from '@nestjs/common';
import { InjectModel,  } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RepositoryBase } from '../../global/base/repository/RepositoryBase';
import { RoleDomain } from '../domain/RoleDomain';
import { Role } from '../schema/RoleSchema';

@Injectable()
export class RoleRepository extends RepositoryBase<Role, RoleDomain> {
	constructor(@InjectModel(Role.name) private readonly roleModel: Model<Role>) {
		super(roleModel, RoleDomain);
	}

	async ReadAll(): Promise<RoleDomain[]> {
        return await super.ReadAll()
	}
}
