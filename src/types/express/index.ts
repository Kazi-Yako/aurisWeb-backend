import { Language, IUser } from '../custom';

// to make the file a module and avoid the TypeScript error
export {};

declare global {
	namespace Express {
		export interface Request {
			language?: Language;
			userAttributes?: IUser | null;
		}
	}
}
