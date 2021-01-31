import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Role } from "../schema/RoleSchema";

@Injectable()
export class RoleService {

    constructor(@InjectModel(Role.name) private readonly roleModel: Model<Role>) {
    }
    
    async CreateRoles(): Promise<void>{
        
        await this.roleModel.create({
            _id: 1,
            Description: 'Admin'
        })
        await this.roleModel.create({
			_id: 2,
			Description: 'Customer'
		});
    }

}