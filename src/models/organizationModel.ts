import { Schema, model } from 'mongoose';
import { IOrganization } from '../types/custom';

const organizationSchema = new Schema<IOrganization>(
	{
		name: {
			type: String,
			required: true,
		},
		countries: [
			{
				type: Schema.Types.ObjectId,
				ref: 'countries',
			},
		],
		brandColor: {
			type: String,
		},
		theme: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);

organizationSchema.index({ name: 1 }, { unique: true });

const OrganizationModel = model<IOrganization>(
	'organizations',
	organizationSchema,
);

export default OrganizationModel;
