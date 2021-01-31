import { UserDomain } from "../../../user/domain/UserDomain";

export interface IRequestWithUser extends Request {
	user: UserDomain
}
