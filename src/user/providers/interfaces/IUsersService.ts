import { CreateUserCommand } from "../../commands/CreateUserCommand";
import { User } from "../../schema/UserSchema";

export interface IUsersService {
	CreateFirstAdminUser(): Promise<User>;
	Create(createUserCommand: CreateUserCommand): Promise<void>;
}