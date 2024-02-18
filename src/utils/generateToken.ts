import jwt, { Secret } from 'jsonwebtoken';
import { NextFunction } from 'express';
import { Request, Response } from 'express';

export const SECRET_KEY: Secret = process.env.JWT_SECRET as string;

// generate token that expires in 12 hours
const generateToken = (id: any) => {
	return jwt.sign({ id }, SECRET_KEY, { expiresIn: '12h' });
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
