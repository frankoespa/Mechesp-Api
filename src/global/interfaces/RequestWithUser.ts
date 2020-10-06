import { Roles } from "../enums/Roles";

export interface RequestWithUser extends Request {
	user: {
		uid: string;
		rol: Roles;
	};
}
