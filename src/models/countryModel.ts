import { Schema, model } from 'mongoose';
import { ICountry } from '../types/custom';

const countrySchema = new Schema<ICountry>(
	{
		name: {
			type: String,
			required: true,
		},
		code: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

const countryModel = model<ICountry>('countries', countrySchema);

export default countryModel;
