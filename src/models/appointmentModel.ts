import { Schema, model } from 'mongoose';
import { IAppointment } from '../types/custom';

const appointmentSchema = new Schema<IAppointment>(
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
		reason: {
			type: String,
			required: true,
		},
		doctor: {
			type: String,
			required: true,
		},
		appointmentType: {
			type: String,
			required: true,
		},
		apptDate: {
			type: Date,
			required: true,
		},
		apptTime: {
			type: Date,
			required: true,
		},
		arrivalTime: {
			type: Date,
			required: false,
		},
		waitTime: {
			type: String,
			required: false,
		},
		apptStatus: {
			type: String,
			required: false,
		},
		isNewPatient: {
			type: Boolean,
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

const appointmentModel = model<IAppointment>('appointments', appointmentSchema);

export default appointmentModel;
