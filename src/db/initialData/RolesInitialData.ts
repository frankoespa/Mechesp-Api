import { CreateQuery } from 'mongoose';
import { Role } from '../../role/schema/RoleSchema';

export const RolesInitialData: CreateQuery<Role>[] = [
	{
		_id: 1,
		Description: 'Admin'
	},
	{
		_id: 2,
		Description: 'Customer'
	}
];
