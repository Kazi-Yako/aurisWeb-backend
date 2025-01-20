import { DiagnosisErrors, PatientErrors } from '../errors';
import { Request, Response } from 'express';
import { IDiagnosis, IPatient } from '../types/custom';
import Diagnosis from '../models/diagnosisModel';
import Patient from '../models/patientModel';
import { ObjectId } from 'mongodb';

const add = async (req: Request, res: Response) => {
	const {
		firstName,
		lastName,
		gender,
		dob,
		complaints,
		additionalNotes,
		diagnosis,
		prescription,
	} = req.body;

	try {
		let firstNameLower = firstName.toString().toLowerCase();
		let lastNameLower = lastName.toString().toLowerCase();
		let formattedDob = dob.toString();

		// check if the patient exists in db
		const patient: IPatient | null = await Patient.findOne({
			firstName: firstNameLower,
			lastName: lastNameLower,
			dob: formattedDob,
		});

		if (!patient || patient == null) {
			return res
				.status(400)
				.json({ message: PatientErrors.NO_PATIENT_FOUND });
		}

		// create new diagnosis document in db
		const newDiagnosis = new Diagnosis({
			firstName,
			lastName,
			gender,
			dob,
			complaints,
			additionalNotes,
			diagnosis,
			prescription,
		});

		await newDiagnosis.save();

		res.status(200).json({ message: 'Diagnosis added successfully' });
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const getDiagnoses = async (req: Request, res: Response) => {
	try {
		const diagnoses: IDiagnosis[] = await Diagnosis.find({});

		res.status(200).json(diagnoses);
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const getDiagnosis = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res
				.status(400)
				.json({ message: DiagnosisErrors.DIAGNOSIS_ID_IS_REQUIRED });
		}

		const diagnosis = await Diagnosis.findOne({ _id: new ObjectId(id) });

		if (!diagnosis) {
			return res
				.status(404)
				.json({ message: DiagnosisErrors.NO_DIAGNOSIS_FOUND });
		}

		res.status(200).json(diagnosis);
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const deleteDiagnosis = async (req: Request, res: Response) => {
	try {
		const diagnosis = await Diagnosis.findOneAndDelete({
			_id: new ObjectId(req.params.id),
		});

		if (!diagnosis) {
			console.log('Not Found');
			res.status(404).json({
				message: DiagnosisErrors.NO_DIAGNOSIS_FOUND,
			});
		}

		res.status(204).end();
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

export { add, getDiagnoses, getDiagnosis, deleteDiagnosis };
