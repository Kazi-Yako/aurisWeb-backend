import { PatientErrors } from '../errors';
import { Request, Response } from 'express';
import { IPatient } from '../types/custom';
import Patient from '../models/patientModel';

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

		res.json({ message: 'Patient added successfully' });
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

export { add };
