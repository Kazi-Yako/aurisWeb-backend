export enum UserErrors {
	NO_USER_FOUND = 'User not found',
	WROND_CREDENTIALS = 'Wrong credentials',
	USERNAME_ALREADY_EXISTS = 'Username already exists',
	INVALID_EMAIL_OR_PASSWORD = 'Invalid email or password',
	EMAIL_IS_REQUIRED = 'Email is required',
}

export enum PatientErrors {
	NO_PATIENT_FOUND = 'Patient not found',
	PATIENT_ALREADY_EXISTS = 'Patient already exists',
	PATIENT_ID_IS_REQUIRED = 'Patient ID is required',
}

export enum DiagnosisErrors {
	NO_DIAGNOSIS_FOUND = 'Diagnosis not found',
	DIAGNOSIS_ID_IS_REQUIRED = 'Diagnosis ID is required',
}

export enum appointmentTypeModelErrors {
	NO_APPOINTMENT_TYPE_FOUND = 'Type of Appointment not found',
	APPOINTMENT_TYPE_ALREADY_EXISTS = 'Type of Appointment already exists',
	APPOINTMENT_TYPE_IS_REQUIRED = 'Type of Appointment ID is required',
}

export enum PhysicianErrors {
	NO_PHYSICIAN_FOUND = 'Physician not found',
	PHYSICIAN_ALREADY_EXISTS = 'Physician already exists',
	PHYSICIAN_ID_IS_REQUIRED = 'Physician ID is required',
}

export enum AppointmentErrors {
	APPOINTMENT_NOT_FOUND = 'Appointment is not found',
	APPOINTMENT_ALREADY_EXISTS = 'Appointment exists already',
	PATIENT_ID_IS_REQUIRED = 'Patient ID is required to set up an Appointment',
	APPOINTMENT_DATE_IS_NOT_PROVIDED = 'Appointment date is not provided',
}

export enum CountryErrors {
	NO_COUNTRY_FOUND = 'Country is not found',
	COUNTRY_ID_IS_REQUIRED = 'Country ID is required1',
	COUNTRY_CODE_IS_REQUIRED = 'Country Code is required1',
	COUNTRY_ALREADY_EXISTS = 'Country already exists',
}

export enum StateErrors {
	NO_STATE_FOUND = 'State is not found',
	STATE_ID_IS_REQUIRED = 'State ID is required',
	STATE_ALREADY_EXISTS = 'State already exists',
	STATE_SHORTNAME_REQUIRED = 'State short name is required',
}

export enum CityErrors {
	NO_CITY_FOUND = 'City is not found',
	CITY_ID_IS_REQUIRED = 'City ID is required1',
	CITY_ALREADY_EXISTS = 'City already exists',
}
