export const SUPPORTED_LANGUAGES = ['en', 'fr'];

// this syntax is equals to "en" | "fr"
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export interface IUser extends Document {
	_id?: number;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	userToken: string | null;
	matchPassword(password: string): boolean;
	status: string;
	role: string;
	createdAt?: string;
	updatedAt?: string;
	picture?: string;
	organizationId?: string;
}

export interface ILogin {
	email: string;
	password: string;
}

export interface authState {
	userInfo: IUser | null;
	organizationInfo: IOrganization | null;
	loading: boolean;
	userToken: string | null;
	error: string | null;
	success: boolean;
	isAuthenticated: boolean;
	totalNumberOfPatients: number;
	numberOfAppts: number;
	patientsWithAppt: IPatient[];
}

export interface IPatient {
	_id?: string;
	firstName: string;
	middleName?: string;
	lastName: string;
	gender: string;
	dob: string;
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
	submit?: string;
	createdAt?: string;
	updatedAt?: string;
	isNewPatient?: boolean;
	allergies?: string;
	medications?: string;
	medicalHistory?: string;
	organizationId?: string;
}

export interface IAppointment {
	_id?: string;
	firstName?: string;
	middleName?: string;
	lastName?: string;
	gender?: string;
	dob?: string;
	appointmentType?: string;
	isNewPatient?: boolean;
	apptStatus?: string;
	waitTime?: string;
	apptTime?: string;
	apptDate?: string;
	arrivalTime?: string;
	reason?: string;
	doctor?: string;
	submit?: string;
	allergies?: string;
	medications?: string;
	medicalHistory?: string;
	organizationId?: string;
}

export interface Istats {
	totalNumberOfPatients: number;
	numberOfAppts: number;
	taskProgress?: number;
	patientsWithAppt?: IPatient[];
}

export interface IDiagnosis {
	_id?: string;
	firstName?: string;
	lastName?: string;
	gender?: string;
	dob?: string;
	complaints: string;
	additionalNotes?: string;
	submit?: string;
	diagnosis?: string;
	prescription?: string;
	createdAt?: string;
	appointmentType?: string;
	doctor?: string;
	organizationId?: string;
}

export interface IAppointmentType {
	_id?: string;
	name?: string;
	shortName?: string;
	description?: string;
	submit?: string;
}

export interface IDashboardState {
	stats: Istats;
	appointments: IAppointment[];
}

export interface IPhysician {
	_id?: string;
	firstName: string;
	middleName?: string;
	lastName: string;
	gender: string;
	specialty: string;
	specialtyCode: string;
	identificationNumber: string;
	address1?: string;
	address2?: string;
	city?: string;
	state?: string;
	zipCode?: string;
	country?: string;
	email?: string;
	personalPhone?: string;
	workPhone?: string;
	submit?: string;
	organizationId?: string;
}

export interface IColumns {
	field: string;
	headerName: string;
	width?: number;
	groupable?: boolean;
	type?: string;
	valueFormatter?: () => {};
}

export interface IPatientSearch {
	firstName: string;
	lastName: string;
	dob: string;
	organizationId: string;
}

export interface IMedicalRecord {
	patientInfo: IPatient;
	diagnoses: IDiagnosis[];
}

export interface IOrganization {
	_id?: string;
	name?: string;
	countries: ICountry[];
	brandColor: string;
	theme: string;
	createdAt?: string;
}

export interface ICountry {
	_id?: string;
	name: string;
}
