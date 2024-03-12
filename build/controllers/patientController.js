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
exports.add = void 0;
const errors_1 = require("../errors");
const patientModel_1 = __importDefault(require("../models/patientModel"));
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, middleName, lastName, gender, dob, address1, address2, city, state, zipCode, country, email, personalPhone, workPhone, assuranceName, } = req.body;
    try {
        // check if the patient exists in db
        const patient = yield patientModel_1.default.findOne({
            firstName,
            lastName,
            dob,
        });
        if (patient) {
            return res
                .status(400)
                .json({ type: errors_1.PatientErrors.PATIENT_ALREADY_EXISTS });
        }
        // create new patient document in db
        const newPatient = new patientModel_1.default({
            firstName,
            middleName,
            lastName,
            gender,
            dob,
            address1,
            address2,
            city,
            state,
            zipCode,
            country,
            email,
            personalPhone,
            workPhone,
            assuranceName,
        });
        yield newPatient.save();
        res.json({ message: 'Patient added successfully' });
    }
    catch (err) {
        res.status(500).json({ type: err });
    }
});
exports.add = add;
//# sourceMappingURL=patientController.js.map