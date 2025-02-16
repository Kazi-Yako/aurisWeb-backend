import User from '../models/userModel';
import { generateToken } from '../utils/generateToken';
import { UserErrors } from '../errors';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { IUser } from '../types/custom';
import { ObjectId } from 'mongodb';

const registerUser = async (req: Request, res: Response) => {
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
		// check if user email exists in db
		const user: IUser | null = await User.findOne({ email });

		// return user obj if their password matches
		if (user && (await user.matchPassword(password))) {
			res.json({
				_id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				userToken: generateToken(user._id),
			});
		} else {
			res.status(400).json({
				type: UserErrors.INVALID_EMAIL_OR_PASSWORD,
			});
		}
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const getUserProfile = async (req: Request, res: Response) => {
	try {
		// req.user was set in authMiddleware.js
		const user = await User.findById(req.userAttributes?._id);

		if (user) {
			res.json({
				id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
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
		const users = await User.find({});
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

		const user = await User.findOne({ _id: new ObjectId(id) });

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
		const user = await User.findOneAndUpdate(
			{ _id: req.params.id },
			{
				$set: req.body,
			},
			{
				returnDocument: 'after',
			}
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
};
