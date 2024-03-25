"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const patientSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    address1: {
        type: String,
        required: true,
    },
    address2: {
        type: String,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
    },
    country: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    personalPhone: {
        type: String,
        required: true,
    },
    workPhone: {
        type: String,
    },
    assuranceName: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const PatientModel = (0, mongoose_1.model)('patients', patientSchema);
exports.default = PatientModel;
//# sourceMappingURL=patientModel.js.map