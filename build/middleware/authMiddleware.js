"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = exports.SECRET_KEY = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../models/userModel"));
exports.SECRET_KEY = process.env.JWT_SECRET;
const protect = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
        try {
            // extract token from authHeader string
            token = authHeader.split(' ')[1];
            // verified token returns user id
            const decoded = jsonwebtoken_1.default.verify(token, exports.SECRET_KEY);
            console.log('decoded', decoded);
            // find user's obj in db and assign to req.user
            req.userAttributes = yield userModel_1.default.findById(decoded.id).select('-password');
            next();
        }
        catch (error) {
            res.status(401).json({
                message: 'Not authorized, invalid token',
            });
        }
    }
    if (!authHeader) {
        res.status(401).json({ message: 'Not authorized, no token found' });
    }
}));
exports.protect = protect;
//# sourceMappingURL=authMiddleware.js.map