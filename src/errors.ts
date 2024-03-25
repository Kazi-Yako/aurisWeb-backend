export enum UserErrors {
	NO_USER_FOUND = 'User not found',
	WROND_CREDENTIALS = 'Wrong credentials',
	USERNAME_ALREADY_EXISTS = 'Username already exists',
	INVALID_EMAIL_OR_PASSWORD = 'Invalid email or password',
}

export enum PatientErrors {
	NO_PATIENT_FOUND = 'Patient not found',
	PATIENT_ALREADY_EXISTS = 'Patient already exists',
	PATIENT_ID_IS_REQUIRED = 'Patient ID is  required',
}
