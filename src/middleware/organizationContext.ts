import { Request, Response, NextFunction } from 'express';

export const requireOrganizationContext = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const organizationId = req.userAttributes?.organizationId;

	if (!organizationId) {
		return res
			.status(403)
			.json({ message: 'Organization context is missing' });
	}

	next();
};
