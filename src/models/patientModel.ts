import { Schema, model } from 'mongoose';
import { IPatient } from '../types/custom';

const patientSchema = new Schema<IPatient>(
	{
		firstName: {
			type: String,
			required: true,
		},
		middleName: {
			type: String,
		},
		lastName: {
			type: String,
			required: true,
		},
		gender: {
			type: String,
			required: true,
		},
		dob: {
			type: String,
			required: true,
		},
		address1: {
			type: String,
			required: true,
		},
		address2: {
			type: String,
		},
		city: {
			type: String,
			required: true,
		},
		state: {
			type: String,
			required: true,
		},
		zipCode: {
			type: String,
		},
		country: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		personalPhone: {
			type: String,
			required: true,
		},
		workPhone: {
			type: String,
		},
		assuranceName: {
			type: String,
			required: true,
		},
		isNewPatient: {
			type: Boolean,
			required: true,
		},
		allergies: {
			type: String,
		},
		medications: {
			type: String,
		},
		medicalHistory: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

patientSchema.index({ firstName: 1, lastName: 1, dob: 1 }, { unique: true });

const PatientModel = model<IPatient>('patients', patientSchema);

export default PatientModel;
