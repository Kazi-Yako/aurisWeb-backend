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
exports.searchPatients = exports.deletePatient = exports.updatePatient = exports.getPatient = exports.getPatients = exports.add = void 0;
const errors_1 = require("../errors");
const patientModel_1 = __importDefault(require("../models/patientModel"));
const mongodb_1 = require("mongodb");
const common_1 = require("../utils/common");
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { firstName, middleName, lastName, gender, dob, address1, address2, city, state, zipCode, country, email, personalPhone, workPhone, assuranceName, } = req.body;
        let firstNameLower = firstName.toString().toLowerCase();
        let middleNameLower = middleName
            ? middleName.toString().toLowerCase()
            : '';
        let lastNameLower = lastName.toString().toLowerCase();
        let formattedDob = dob.toString();
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
            isNewPatient: true,
        });
        yield newPatient.save();
        res.status(200).json({ message: 'Patient added successfully' });
    }
    catch (err) {
        res.status(500).json({ type: err });
    }
});
exports.add = add;
const searchPatients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, dob } = req.query;
        let searchOptions = {
            firstName: '',
            lastName: '',
            dob: '',
        };
        if (firstName)
            searchOptions.firstName = firstName.toString().toLowerCase();
        if (lastName)
            searchOptions.lastName = lastName.toString().toLowerCase();
        if (dob)
            searchOptions.dob = dob.toString();
        const patients = yield patientModel_1.default.find(searchOptions);
        res.status(200).json(patients);
    }
    catch (err) {
        res.status(500).json({ type: err });
    }
});
exports.searchPatients = searchPatients;
const getPatients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patients = yield patientModel_1.default.find({});
        let newPatients = [];
        for (let patient of patients) {
            let newPatient = {
                _id: patient._id,
                firstName: patient.firstName,
                lastName: patient.lastName,
                middleName: patient.middleName,
                gender: patient.gender,
                address1: patient.address1,
                address2: patient.address2,
                city: patient.city,
                state: patient.state,
                zipCode: patient.zipCode,
                country: patient.country,
                email: patient.email,
                personalPhone: patient.personalPhone,
                workPhone: patient.workPhone,
                assuranceName: patient.assuranceName,
                dob: (0, common_1.convertDate)(patient.dob),
                isNewPatient: patient.isNewPatient,
            };
            if (patient.createdAt)
                newPatient.createdAt = (0, common_1.convertDate)(patient.createdAt);
            if (patient.updatedAt)
                newPatient.updatedAt = (0, common_1.convertDate)(patient.updatedAt);
            newPatients.push(newPatient);
        }
        res.status(200).json(newPatients);
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