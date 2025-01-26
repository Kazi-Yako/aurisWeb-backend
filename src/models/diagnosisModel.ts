import { Schema, model } from 'mongoose';
import { IDiagnosis } from '../types/custom';

const diagnosisSchema = new Schema<IDiagnosis>(
	{
		firstName: {
			type: String,
			required: true,
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
		complaints: {
			type: String,
			required: true,
		},
		additionalNotes: {
			type: String,
		},
		diagnosis: {
			type: String,
		},
		prescription: {
			type: String,
		},
		doctor: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const DiagnosisModel = model<IDiagnosis>('diagnoses', diagnosisSchema);

export default DiagnosisModel;
