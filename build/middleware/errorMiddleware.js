"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
const notFound = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        // provide stack property only in development mode
        stack: (process.env.NODE_ENV = 'production' ? null : err.stack),
    });
};
exports.notFound = notFound;
const errorHandler = (req, res, next) => {
    const error = new Error(`Not found: ${req.originalUrl}`);
    res.status(404).json({ message: error });
    next(error);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorMiddleware.js.map