import User from '../models/userModel';
import { generateToken } from '../utils/generateToken';
import { UserErrors } from '../errors';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { IUser } from '../types/custom';
import { ObjectId } from 'mongodb';
import { uploadImageToGCP } from './uploadController';
import OrganizationModel from '../models/organizationModel';

const registerUser = async (req: Request, res: Response) => {
	const orgId = req.userAttributes?.organizationId;

	if (!orgId) {
		return res.status(400).json({ message: 'Organization ID is required' });
	}

	if (
		req.userAttributes?.role !== 'admin' &&
		req.userAttributes?.role !== 'manager'
	) {
		return res.status(403).json({
			message: 'You are not authorized to create users',
		});
	}

	const { firstName, lastName, email, password, role, status } = req.body;

	try {
		// check if email exists in db
		const user: IUser | null = await User.findOne({ email });

		if (user) {
			return res
				.status(400)
				.json({ type: UserErrors.USERNAME_ALREADY_EXISTS });
		}

		const salt = await bcrypt.genSalt(10);

		const hashedPassword = await bcrypt.hash(password, salt);

		// create new user document in db
		const newUser = new User({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			status,
			role,
			organizationId: orgId,
		});

		await newUser.save();

		res.json({ message: 'User registered successfully' });
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const loginUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const userEmail = email.toString().toLowerCase().trim();

		const userPassword = password.toString().trim();
		// check if user email exists in db
		const user: IUser | null = await User.findOne({ email: userEmail });

		// return user obj if their password matches
		if (user && (await user.matchPassword(userPassword))) {
			const organization = await OrganizationModel.findById(
				user.organizationId,
			);

			res.json({
				_id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				userToken: generateToken(
					String(user._id),
					String(user.organizationId),
				),
				role: user.role,
				status: user.status,
				picture: user.picture,
				organizationId: user.organizationId?.toString,
				organization,
			});
		} else {
			res.status(400).json({
				type: UserErrors.INVALID_EMAIL_OR_PASSWORD,
				message: 'Invalid email or password',
			});
		}
	} catch (err) {
		res.status(500).json({
			message: 'Server error. Please try again later',
		});
	}
};

const getUserProfile = async (req: Request, res: Response) => {
	try {
		// req.user was set in authMiddleware.js
		const user = await User.findById({
			_id: req.userAttributes?._id,
			organizationId: req.userAttributes?.organizationId,
		});

		if (user) {
			res.json({
				id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				role: user.role,
				status: user.status,
				picture: user.picture,
			});
		} else {
			res.status(404).json({ type: UserErrors.NO_USER_FOUND });
		}
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await User.find({
			organizationId: req.userAttributes?.organizationId,
		});
		res.json(users);
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const getUserById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res
				.status(400)
				.json({ message: UserErrors.EMAIL_IS_REQUIRED });
		}

		const user = await User.findOne({
			_id: new ObjectId(id),
			organizationId: req.userAttributes?.organizationId,
		});

		if (!user) {
			return res.status(404).json({ message: UserErrors.NO_USER_FOUND });
		}

		res.status(200).json(user);
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const updateUser = async (req: Request, res: Response) => {
	try {
		// If a file was uploaded, assume req.file exists.
		// For instance, you might have used multer in your route.
		if (req.file) {
			// Here, you would typically call your function that handles the file upload to GCP.
			const imageUrl = await uploadImageToGCP(req.file);

			// Merge the image URL into the update fields.
			req.body.picture = imageUrl;
		}

		const user = await User.findOneAndUpdate(
			{
				_id: req.params.id,
				organizationId: req.userAttributes?.organizationId,
			},
			{
				$set: req.body,
			},
			{
				returnDocument: 'after',
			},
		);

		if (!user) {
			return res.status(404).json({ message: UserErrors.NO_USER_FOUND });
		}

		res.status(200).json(user);
	} catch (err: any) {
		// Check if the error is a duplicate key error
		if (err.code === 11000) {
			return res.status(409).json({ message: 'Duplicate user found' });
		}
		res.status(500).json({ type: err });
	}
};

const updatePassword = async (req: Request, res: Response) => {
	try {
		const { password } = req.body;

		const salt = await bcrypt.genSalt(10);

		const hashedPassword = await bcrypt.hash(password, salt);

		// Update only the password field
		const user = await User.findOneAndUpdate(
			{
				_id: req.params.id,
				organizationId: req.userAttributes?.organizationId,
			},
			{
				$set: { password: hashedPassword },
			},
			{
				returnDocument: 'after',
			},
		);

		if (!user) {
			res.status(404).json({ message: UserErrors.NO_USER_FOUND });
		}

		res.status(200).json(user);
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

export {
	registerUser,
	loginUser,
	getUserProfile,
	getUsers,
	getUserById,
	updateUser,
	updatePassword,
};
