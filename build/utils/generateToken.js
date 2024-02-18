"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = exports.SECRET_KEY = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.SECRET_KEY = process.env.JWT_SECRET;
// generate token that expires in 12 hours
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, exports.SECRET_KEY, { expiresIn: '12h' });
};
exports.generateToken = generateToken;
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        jsonwebtoken_1.default.verify(authHeader, exports.SECRET_KEY, (err) => {
            if (err) {
                return res.sendStatus(403);
            }
            next();
        });
    }
    return res.sendStatus(401);
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=generateToken.js.map