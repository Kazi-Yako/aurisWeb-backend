import { PatientErrors } from '../errors';
import { Request, Response } from 'express';
import { IPatient } from '../types/custom';
import Patient from '../models/patientModel';
import { ObjectId } from 'mongodb';

const add = async (req: Request, res: Response) => {
	const {
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
	} = req.body;

	try {
		// check if the patient exists in db
		const patient: IPatient | null = await Patient.findOne({
			firstName,
			lastName,
			dob,
		});

		if (patient) {
			return res
				.status(400)
				.json({ type: PatientErrors.PATIENT_ALREADY_EXISTS });
		}

		// create new patient document in db
		const newPatient = new Patient({
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

		await newPatient.save();

		res.status(200).json({ message: 'Patient added successfully' });
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const getPatients = async (req: Request, res: Response) => {
	try {
		const patients: IPatient[] = await Patient.find({});

		res.status(200).json(patients);
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const getPatient = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res
				.status(400)
				.json({ message: PatientErrors.PATIENT_ID_IS_REQUIRED });
		}

		const patient = await Patient.findOne({ _id: new ObjectId(id) });

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
		const patient = await Patient.findOneAndUpdate(
			{ _id: new ObjectId(req.params.id) },
			{
				$set: req.body,
			},
			{
				returnDocument: 'after',
			}
		);

		if (!patient) {
			console.log('Not Found');
			res.status(404).json({ message: PatientErrors.NO_PATIENT_FOUND });
		}

		res.status(200).json(patient);
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const deletePatient = async (req: Request, res: Response) => {
	try {
		const patient = await Patient.findOneAndDelete({
			_id: new ObjectId(req.params.id),
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

export { add, getPatients, getPatient, updatePatient, deletePatient };
