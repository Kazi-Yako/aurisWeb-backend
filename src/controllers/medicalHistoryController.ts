import { Request, Response } from 'express';
import {
	IDiagnosis,
	IMedicalRecord,
	IPatient,
	IPatientSearch,
} from '../types/custom';
import Patient from '../models/patientModel';
import Diagnosis from '../models/diagnosisModel';
import { convertDate } from '../utils/common';

const getMedicalRecords = async (req: Request, res: Response) => {
	try {
		const patients: IPatient[] = await Patient.find({});

		let newPatients: IPatient[] = [];

		for (let patient of patients) {
			let newPatient: IPatient = {
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
				dob: convertDate(patient.dob),
				isNewPatient: patient.isNewPatient,
				allergies: patient.allergies,
				medications: patient.medications,
				medicalHistory: patient.medicalHistory,
			};

			if (patient.createdAt)
				newPatient.createdAt = convertDate(patient.createdAt);

			if (patient.updatedAt)
				newPatient.updatedAt = convertDate(patient.updatedAt);

			newPatients.push(newPatient);
		}

		res.status(200).json(newPatients);
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const getPatientMedicalRecords = async (req: Request, res: Response) => {
	try {
		const { firstName, lastName, dob } = req.query;

		let searchOptions: IPatientSearch = {
			firstName: '',
			lastName: '',
			dob: '',
		};

		if (firstName)
			searchOptions.firstName = firstName.toString().toLowerCase();
		if (lastName)
			searchOptions.lastName = lastName.toString().toLowerCase();
		if (dob) searchOptions.dob = dob.toString();

		const patients: IPatient[] = await Patient.find(searchOptions);

		const diagnoses: IDiagnosis[] = await Diagnosis.find(searchOptions);

		let patientRecord: IMedicalRecord = {
			patientInfo: patients[0],
			diagnoses: diagnoses,
		};

		res.status(200).json(patientRecord);
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

export { getMedicalRecords, getPatientMedicalRecords };
