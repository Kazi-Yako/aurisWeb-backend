import { Schema, model } from 'mongoose';
import { IPhysician } from '../types/custom';

const physicianSchema = new Schema<IPhysician>(
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
		specialty: {
			type: String,
			required: true,
		},
		specialtyCode: {
			type: String,
			required: true,
		},
		identificationNumber: {
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
	},
	{
		timestamps: true,
	}
);

const PhysicianModel = model<IPhysician>('physicians', physicianSchema);

export default PhysicianModel;
