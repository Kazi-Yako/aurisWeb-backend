import { PatientErrors } from '../errors';
import { Request, Response } from 'express';
import { IPatient, IPatientSearch } from '../types/custom';
import Patient from '../models/patientModel';
import { ObjectId } from 'mongodb';
import { convertDate } from '../utils/common';
import { Types } from 'mongoose';

const add = async (req: Request, res: Response) => {
	try {
		const orgId = req.userAttributes?.organizationId;

		if (!orgId) {
			return res
				.status(400)
				.json({ message: 'Organization ID is required' });
		}

		let {
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
			allergies,
			medications,
			medicalHistory,
		} = req.body;

		let firstNameLower = firstName.toString().toLowerCase();
		let middleNameLower = middleName
			? middleName.toString().toLowerCase()
			: '';
		let lastNameLower = lastName.toString().toLowerCase();
		let formattedDob = dob.toString();

		// check if the patient exists in db
		const patient: IPatient | null = await Patient.findOne({
			firstName: firstNameLower,
			lastName: lastNameLower,
			dob: formattedDob,
			organizationId: orgId,
		});

		if (patient) {
			return res
				.status(400)
				.json({ message: PatientErrors.PATIENT_ALREADY_EXISTS });
		}

		// create new patient document in db
		let newPatient = new Patient({
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
			allergies,
			medications,
			medicalHistory,
			organizationId: orgId,
		});

		await newPatient.save();

		res.status(200).json({ message: 'Patient added successfully' });
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const searchPatients = async (req: Request, res: Response) => {
	try {
		const { firstName, lastName, dob } = req.query;

		const orgId = req.userAttributes?.organizationId;

		if (!orgId) {
			return res
				.status(400)
				.json({ message: 'Organization ID is required' });
		}

		let searchOptions: Partial<IPatientSearch> = {};

		if (firstName)
			searchOptions.firstName = firstName.toString().toLowerCase();

		if (lastName)
			searchOptions.lastName = lastName.toString().toLowerCase();

		if (dob) searchOptions.dob = dob.toString();

		searchOptions.organizationId = orgId;

		const patients: IPatient[] = await Patient.find(searchOptions);

		res.status(200).json(patients);
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const getPatients = async (req: Request, res: Response) => {
	try {
		const orgId = req.userAttributes?.organizationId;

		if (!orgId) {
			return res
				.status(400)
				.json({ message: 'Organization ID is required' });
		}

		const patients: IPatient[] = await Patient.find({
			organizationId: orgId,
		});

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
				organizationId: patient.organizationId,
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

const getPatient = async (req: Request, res: Response) => {
	try {
		const orgId = req.userAttributes?.organizationId;

		if (!orgId) {
			return res
				.status(400)
				.json({ message: 'Organization ID is required' });
		}

		const { id } = req.params;

		if (!id) {
			return res
				.status(400)
				.json({ message: PatientErrors.PATIENT_ID_IS_REQUIRED });
		}

		const patient = await Patient.findOne({
			_id: new ObjectId(id),
			organizationId: orgId,
		});

		if (!patient) {
			return res
				.status(404)
				.json({ message: PatientErrors.NO_PATIENT_FOUND });
		}

		res.status(200).json(patient);
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const updatePatient = async (req: Request, res: Response) => {
	try {
		const orgId = req.userAttributes?.organizationId;

		if (!orgId) {
			return res
				.status(400)
				.json({ message: 'Organization ID is required' });
		}
		const patient = await Patient.findOneAndUpdate(
			{
				_id: new ObjectId(req.params.id),
				organizationId: orgId,
			},
			{
				$set: req.body,
			},
			{
				returnDocument: 'after',
			},
		);

		if (!patient) {
			res.status(404).json({ message: PatientErrors.NO_PATIENT_FOUND });
		}

		res.status(200).json(patient);
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const deletePatient = async (req: Request, res: Response) => {
	try {
		const orgId = req.userAttributes?.organizationId;

		if (!orgId) {
			return res
				.status(400)
				.json({ message: 'Organization ID is required' });
		}

		const patient = await Patient.findOneAndDelete({
			_id: new ObjectId(req.params.id),
			organizationId: orgId,
		});

		if (!patient) {
			console.log('Not Found');
			res.status(404).json({ message: PatientErrors.NO_PATIENT_FOUND });
		}

		res.status(204).end();
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

export {
	add,
	getPatients,
	getPatient,
	updatePatient,
	deletePatient,
	searchPatients,
};
