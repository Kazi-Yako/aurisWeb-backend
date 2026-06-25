import mongoose, { Schema, model } from 'mongoose';
import { IState } from '../types/custom';

const stateSchema = new Schema<IState>(
	{
		name: {
			type: String,
			required: true,
		},
		shortName: {
			type: String,
			required: true,
		},
		countryId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'countries',
			required: true,
			index: true,
		},
	},
	{
		timestamps: true,
	},
);

const stateModel = model<IState>('states', stateSchema);

export default stateModel;
