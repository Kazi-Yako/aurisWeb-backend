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
exports.getUserProfile = exports.loginUser = exports.registerUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const generateToken_1 = require("../utils/generateToken");
const errors_1 = require("../errors");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    try {
        // check if email exists in db
        const user = yield userModel_1.default.findOne({ email });
        if (user) {
            return res
                .status(400)
                .json({ type: errors_1.UserErrors.USERNAME_ALREADY_EXISTS });
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        // create new user document in db
        const newUser = new userModel_1.default({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        yield newUser.save();
        res.json({ message: 'User registered successfully' });
    }
    catch (err) {
        res.status(500).json({ type: err });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // check if user email exists in db
        const user = yield userModel_1.default.findOne({ email });
        // return user obj if their password matches
        if (user && (yield user.matchPassword(password))) {
            res.json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userToken: (0, generateToken_1.generateToken)(user._id),
            });
        }
        else {
            res.status(400).json({
                type: errors_1.UserErrors.INVALID_EMAIL_OR_PASSWORD,
            });
        }
    }
    catch (err) {
        res.status(500).json({ type: err });
    }
});
exports.loginUser = loginUser;
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // req.user was set in authMiddleware.js
        const user = yield userModel_1.default.findById((_a = req.userAttributes) === null || _a === void 0 ? void 0 : _a._id);
        if (user) {
            res.json({
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            });
        }
        else {
            res.status(404).json({ type: errors_1.UserErrors.NO_USER_FOUND });
        }
    }
    catch (err) {
        res.status(500).json({ type: err });
    }
});
exports.getUserProfile = getUserProfile;
//# sourceMappingURL=userController.js.map