import { Injectable } from '@nestjs/common';
import { DropDownVM } from '../../global/base/DropDownVM';
import { RoleRepository } from './RoleRepository';

@Injectable()
export class RoleService {
	constructor(private readonly roleRepository: RoleRepository) {}

	async ReadAll(): Promise<DropDownVM[]>{
        const rolesDomain = await this.roleRepository.ReadAll();
        return rolesDomain.map<DropDownVM>(r => ({_id: r.Doc._id, Description: r.Doc.Description}))
    }
}
