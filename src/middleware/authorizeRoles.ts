import { Request, Response, NextFunction } from 'express';

export const authorizeRoles =
	(...allowedRoles: string[]) =>
	(req: Request, res: Response, next: NextFunction) => {
		const user = req.userAttributes;

		if (!user) {
			return res.status(401).json({
				message: 'Not authorized (no user found)',
			});
		}

		if (!allowedRoles.includes(user.role)) {
			return res.status(403).json({
				message: `Role '${user.role}' is not allowed to access this resource`,
			});
		}

		next();
	};
