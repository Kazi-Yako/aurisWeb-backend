import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import UserModel from '../models/userModel';
import { Request, Response, NextFunction } from 'express';

export const SECRET_KEY: Secret = process.env.JWT_SECRET as string;

interface JwtTokenInterface {
	id: string;
	organizationId: string;
	iat: number;
	exp: number;
}

const protect = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		let token: string | JwtPayload;

		const authHeader = req.headers.authorization;

		if (authHeader && authHeader.startsWith('Bearer')) {
			// extract token from authHeader string
			token = authHeader.split(' ')[1];

			if (!token) {
				res.status(401).json({ message: 'Not authorized, no token' });
				return;
			}

			try {
				const decoded = jwt.verify(token, SECRET_KEY) as {
					_id: string;
					organizationId: string;
				};

				// find user's obj in db and assign to req.user
				req.userAttributes = await UserModel.findById({
					_id: decoded._id,
					organizationId: decoded.organizationId,
				}).select('-password');

				next();
			} catch (error) {
				res.status(401).json({
					message: 'Not authorized, invalid token',
				});
				return;
			}
		}

		if (!authHeader) {
			res.status(401).json({ message: 'Not authorized, no token found' });
			return;
		}
	},
);

export { protect };
