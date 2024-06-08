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
exports.deletePatient = exports.updatePatient = exports.getPatient = exports.getPatients = exports.add = void 0;
const errors_1 = require("../errors");
const patientModel_1 = __importDefault(require("../models/patientModel"));
const mongodb_1 = require("mongodb");
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { firstName, middleName, lastName, gender, dob, address1, address2, city, state, zipCode, country, email, personalPhone, workPhone, assuranceName, } = req.body;
        let firstNameLower = new String(firstName).toLowerCase();
        let middleNameLower = middleName
            ? new String(middleName).toLowerCase()
            : '';
        let lastNameLower = new String(lastName).toLowerCase();
        let formattedDob = new Date(dob).toString();
        // check if the patient exists in db
        const patient = yield patientModel_1.default.findOne({
            firstName: firstNameLower,
            lastName: lastNameLower,
            dob: formattedDob,
        });
        if (patient) {
            return res
                .status(400)
                .json({ message: errors_1.PatientErrors.PATIENT_ALREADY_EXISTS });
        }
        // create new patient document in db
        let newPatient = new patientModel_1.default({
            firstName: firstNameLower,
            middleName: middleNameLower,
            lastName: lastNameLower,
            dob: formattedDob,
            gender,
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
        res.status(200).json({ message: 'Patient added successfully' });
    }
    catch (err) {
        res.status(500).json({ type: err });
    }
});
exports.add = add;
const getPatients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patients = yield patientModel_1.default.find({});
        res.status(200).json(patients);
    }
    catch (err) {
        res.status(500).json({ type: err });
    }
});
exports.getPatients = getPatients;
const getPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return res
                .status(400)
                .json({ message: errors_1.PatientErrors.PATIENT_ID_IS_REQUIRED });
        }
        const patient = yield patientModel_1.default.findOne({ _id: new mongodb_1.ObjectId(id) });
        if (!patient) {
            return res
                .status(404)
                .json({ message: errors_1.PatientErrors.NO_PATIENT_FOUND });
        }
        res.status(200).json(patient);
    }
    catch (err) {
        res.status(500).json({ type: err });
    }
});
exports.getPatient = getPatient;
const updatePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patient = yield patientModel_1.default.findOneAndUpdate({ _id: new mongodb_1.ObjectId(req.params.id) }, {
            $set: req.body,
        }, {
            returnDocument: 'after',
        });
        if (!patient) {
            console.log('Not Found');
            res.status(404).json({ message: errors_1.PatientErrors.NO_PATIENT_FOUND });
        }
        res.status(200).json(patient);
    }
    catch (err) {
        res.status(500).json({ type: err });
    }
});
exports.updatePatient = updatePatient;
const deletePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patient = yield patientModel_1.default.findOneAndDelete({
            _id: new mongodb_1.ObjectId(req.params.id),
        });
        if (!patient) {
            console.log('Not Found');
            res.status(404).json({ message: errors_1.PatientErrors.NO_PATIENT_FOUND });
        }
        res.status(204).end();
    }
    catch (err) {
        res.status(500).json({ type: err });
    }
});
exports.deletePatient = deletePatient;
//# sourceMappingURL=patientController.js.map