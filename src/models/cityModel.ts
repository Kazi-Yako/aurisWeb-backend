import mongoose, { Schema, model } from 'mongoose';
import { ICity } from '../types/custom';

const citySchema = new Schema<ICity>(
	{
		name: {
			type: String,
			required: true,
		},
		countryId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'countries',
			required: true,
			index: true,
		},
		stateId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'states',
			required: true,
			index: true,
		},
	},
	{
		timestamps: true,
	},
);

const cityModel = model<ICity>('cities', citySchema);

export default cityModel;
