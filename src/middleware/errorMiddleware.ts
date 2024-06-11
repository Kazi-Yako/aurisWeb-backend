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
		stack: (process.env.NODE_ENV = 'production' ? null : err.stack),
	});
};

const errorHandler = (req: Request, res: Response, next: NextFunction) => {
	const error = new Error(`Not found: ${req.originalUrl}`);
	res.status(404).json({ message: error });
	next(error);
};

export { notFound, errorHandler };
