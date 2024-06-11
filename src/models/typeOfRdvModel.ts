import { Schema, model } from 'mongoose';
import { ITypeOfRdv } from '../types/custom';

const typeOfRdvSchema = new Schema<ITypeOfRdv>(
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

const typeOfRdvModel = model<ITypeOfRdv>('typeOfRdvs', typeOfRdvSchema);

export default typeOfRdvModel;
