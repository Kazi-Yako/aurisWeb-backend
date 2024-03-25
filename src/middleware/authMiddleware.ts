import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import UserModel from '../models/userModel';
import { Request, Response, NextFunction } from 'express';

export const SECRET_KEY: Secret = process.env.JWT_SECRET as string;

interface JwtTokenInterface {
	id: string;
	iat: number;
	exp: number;
}

const protect = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		let token: string | JwtPayload;

		const authHeader = req.headers.authorization;

		if (authHeader && authHeader.startsWith('Bearer')) {
			try {
				// extract token from authHeader string
				token = authHeader.split(' ')[1];

				// verified token returns user id
				const decoded = jwt.verify(
					token,
					SECRET_KEY
				) as JwtTokenInterface;

				// find user's obj in db and assign to req.user
				req.userAttributes = await UserModel.findById(
					decoded.id
				).select('-password');

				next();
			} catch (error) {
				res.status(401).json({
					message: 'Not authorized, invalid token',
				});
			}
		}

		if (!authHeader) {
			res.status(401).json({ message: 'Not authorized, no token found' });
		}
	}
);

export { protect };
