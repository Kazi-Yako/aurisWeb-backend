export const SUPPORTED_LANGUAGES = ['en', 'fr'];

// this syntax is equals to "en" | "fr"
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export interface UserAttributes extends Document {
	_id?: number;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	userToken: string | null;
	matchPassword(password: string): boolean;
}

export interface LoginAttributes {
	email: string;
	password: string;
}

export interface authState {
	userInfo: UserAttributes | null;
	loading: boolean;
	userToken: string | null;
	error: string | null;
	success: boolean;
}

export interface IPatient {
	_id?: string;
	firstName: string;
	middleName?: string;
	lastName: string;
	gender?: string;
	dob?: Date;
	address1?: string;
	address2?: string;
	city?: string;
	state?: string;
	zipCode?: string;
	country?: string;
	email?: string;
	personalPhone?: string;
	workPhone?: string;
	assuranceName?: string;
	submit: string | undefined;
}
