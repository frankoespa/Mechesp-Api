import { ISendMailBase } from './ISendMailBase';

export interface ISendPassForMail extends ISendMailBase {
	Variables: { name: string; password: string };
}
