import { Request, Response, NextFunction } from 'express';

const notFound = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

	res.status(statusCode);

	res.json({
		message: err.message,
		// provide stack property only in development mode
		stack: process.env.NODE_ENV == 'production' ? null : err.stack,
	});
};

const errorHandler = (req: Request, res: Response, next: NextFunction) => {
	let errorMessage = `Not found: ${req.originalUrl}`;
	const error = new Error(errorMessage);
	res.status(404);
	next(error);
};

export { notFound, errorHandler };
