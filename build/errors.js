"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhysicianErrors = exports.TypeOfRdvErrors = exports.DiagnosisErrors = exports.PatientErrors = exports.UserErrors = void 0;
var UserErrors;
(function (UserErrors) {
    UserErrors["NO_USER_FOUND"] = "User not found";
    UserErrors["WROND_CREDENTIALS"] = "Wrong credentials";
    UserErrors["USERNAME_ALREADY_EXISTS"] = "Username already exists";
    UserErrors["INVALID_EMAIL_OR_PASSWORD"] = "Invalid email or password";
})(UserErrors || (exports.UserErrors = UserErrors = {}));
var PatientErrors;
(function (PatientErrors) {
    PatientErrors["NO_PATIENT_FOUND"] = "Patient not found";
    PatientErrors["PATIENT_ALREADY_EXISTS"] = "Patient already exists";
    PatientErrors["PATIENT_ID_IS_REQUIRED"] = "Patient ID is required";
})(PatientErrors || (exports.PatientErrors = PatientErrors = {}));
var DiagnosisErrors;
(function (DiagnosisErrors) {
    DiagnosisErrors["NO_DIAGNOSIS_FOUND"] = "Diagnosis not found";
    DiagnosisErrors["DIAGNOSIS_ID_IS_REQUIRED"] = "Diagnosis ID is required";
})(DiagnosisErrors || (exports.DiagnosisErrors = DiagnosisErrors = {}));
var TypeOfRdvErrors;
(function (TypeOfRdvErrors) {
    TypeOfRdvErrors["NO_TYPE_OF_RDV_FOUND"] = "Type of Appointment not found";
    TypeOfRdvErrors["TYPE_OF_RDV_ALREADY_EXISTS"] = "Type of Appointment already exists";
    TypeOfRdvErrors["TYPE_OF_RDV_ID_IS_REQUIRED"] = "Type of Appointment ID is required";
})(TypeOfRdvErrors || (exports.TypeOfRdvErrors = TypeOfRdvErrors = {}));
var PhysicianErrors;
(function (PhysicianErrors) {
    PhysicianErrors["NO_PHYSICIAN_FOUND"] = "Physician not found";
    PhysicianErrors["PHYSICIAN_ALREADY_EXISTS"] = "Physician already exists";
    PhysicianErrors["PHYSICIAN_ID_IS_REQUIRED"] = "Physician ID is required";
})(PhysicianErrors || (exports.PhysicianErrors = PhysicianErrors = {}));
//# sourceMappingURL=errors.js.map