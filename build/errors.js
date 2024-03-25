"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientErrors = exports.UserErrors = void 0;
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
    PatientErrors["PATIENT_ID_IS_REQUIRED"] = "Patient ID is  required";
})(PatientErrors || (exports.PatientErrors = PatientErrors = {}));
//# sourceMappingURL=errors.js.map