import { Schema, model } from 'mongoose';
import { IAppointmentType } from '../types/custom';

const appointmentTypeSchema = new Schema<IAppointmentType>(
	{
		name: {
			type: String,
			required: true,
		},
		shortName: {
			type: String,
		},
		description: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

const appointmentTypeModel = model<IAppointmentType>(
	'appointmentTypes',
	appointmentTypeSchema,
);

export default appointmentTypeModel;
