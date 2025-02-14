import bcrypt from 'bcryptjs';
import { Schema, model } from 'mongoose';
import { IUser } from '../types/custom';

const userSchema = new Schema<IUser>(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.index({ email: 1 }, { unique: true });

// extend matchPassword function unto userSchema
userSchema.methods.matchPassword = async function (enteredPassword: string) {
	return await bcrypt.compare(enteredPassword, this.password);
};

const UserModel = model<IUser>('user', userSchema);

export default UserModel;
