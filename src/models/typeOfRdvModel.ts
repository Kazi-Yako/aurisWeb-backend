import { Schema, model } from 'mongoose';
import { ITypeOfAppointment } from '../types/custom';

const typeOfRdvSchema = new Schema<ITypeOfAppointment>(
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
	}
);

const typeOfRdvModel = model<ITypeOfAppointment>('typeOfRdvs', typeOfRdvSchema);

export default typeOfRdvModel;
