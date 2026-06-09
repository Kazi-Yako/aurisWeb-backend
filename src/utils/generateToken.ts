import jwt, { Secret } from 'jsonwebtoken';
import { NextFunction } from 'express';
import { Request, Response } from 'express';

export const SECRET_KEY: Secret = process.env.JWT_SECRET as string;

const generateToken = (userId: string, organizationId: string) => {
	return jwt.sign(
		{
			_id: userId,
			organizationId,
		},
		SECRET_KEY,
		{
			expiresIn: '12h',
		},
	);
};

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;

	if (authHeader) {
		jwt.verify(authHeader, SECRET_KEY, (err) => {
			if (err) {
				return res.sendStatus(403);
			}

			next();
		});
	}

	return res.sendStatus(401);
};

export { generateToken, verifyToken };
