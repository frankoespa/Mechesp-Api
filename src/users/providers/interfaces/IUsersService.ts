import { CreateUserAdminCommand } from "../../../global/commands/users/CreateUserAdminCommand";
import { CreateUserCustomerCommand } from "../../../global/commands/users/CreateUserCustomerCommand";
import { LinkCustomerCommand } from "../../../global/commands/users/LinkCustomerCommand";
import { User } from "../../schema/user.schema";

export interface IUsersService {
	CreateCustomer(createUserCustomerCommand: CreateUserCustomerCommand): Promise<User>;
	CreateFirstAdmin(createUserAdminCommand: CreateUserAdminCommand): Promise<User>;
	LinkCustomer(linkCustomerCommand: LinkCustomerCommand): Promise<User>;
}