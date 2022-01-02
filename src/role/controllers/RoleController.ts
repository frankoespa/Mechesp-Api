import { Controller, Get } from '@nestjs/common';
import { DropDownVM } from '../../global/base/DropDownVM';
import { RoleService } from '../providers/RoleService';

@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService){}

    @Get('all')
    async ReadAll(): Promise<DropDownVM[]>{
        return await this.roleService.ReadAll()
    }

}
