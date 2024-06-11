import { PhysicianErrors } from '../errors';
import { Request, Response } from 'express';
import { IPhysician } from '../types/custom';
import Physician from '../models/physicianModel';
import { ObjectId } from 'mongodb';

const add = async (req: Request, res: Response) => {
	try {
		let {
			firstName,
			middleName,
			lastName,
			gender,
			specialty,
			specialtyCode,
			identificationNumber,
			address1,
			address2,
			city,
			state,
			zipCode,
			country,
			email,
			personalPhone,
			workPhone,
		} = req.body;

		let firstNameLower = new String(firstName).toLowerCase();
		let middleNameLower = middleName
			? new String(middleName).toLowerCase()
			: '';
		let lastNameLower = new String(lastName).toLowerCase();
		let specialtyLower = new String(specialty).toLowerCase();
		let specialtyCodeLower = new String(specialtyCode).toLowerCase();
		let identificationNumberLower = new String(
			identificationNumber
		).toLowerCase();

		// check if the physician exists in db
		const physician: IPhysician | null = await Physician.findOne({
			firstName: firstNameLower,
			lastName: lastNameLower,
			identificationNumber: identificationNumberLower,
		});

		if (physician) {
			return res
				.status(400)
				.json({ message: PhysicianErrors.PHYSICIAN_ALREADY_EXISTS });
		}

		// create new physician document in db
		let newPhysician = new Physician({
			firstName: firstNameLower,
			middleName: middleNameLower,
			lastName: lastNameLower,
			gender,
			specialty: specialtyLower,
			specialtyCode: specialtyCodeLower,
			identificationNumber: identificationNumberLower,
			address1,
			address2,
			city,
			state,
			zipCode,
			country,
			email,
			personalPhone,
			workPhone,
		});

		await newPhysician.save();

		res.status(200).json({ message: 'Physician added successfully' });
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const getPhysicians = async (req: Request, res: Response) => {
	try {
		const physicians: IPhysician[] = await Physician.find({});

		res.status(200).json(physicians);
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const getPhysician = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res
				.status(400)
				.json({ message: PhysicianErrors.PHYSICIAN_ID_IS_REQUIRED });
		}

		const physician = await Physician.findOne({ _id: new ObjectId(id) });

		if (!physician) {
			return res
				.status(404)
				.json({ message: PhysicianErrors.NO_PHYSICIAN_FOUND });
		}

		res.status(200).json(physician);
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const updatePhysician = async (req: Request, res: Response) => {
	try {
		const physician = await Physician.findOneAndUpdate(
			{ _id: new ObjectId(req.params.id) },
			{
				$set: req.body,
			},
			{
				returnDocument: 'after',
			}
		);

		if (!physician) {
			console.log('Not Found');
			res.status(404).json({
				message: PhysicianErrors.NO_PHYSICIAN_FOUND,
			});
		}

		res.status(200).json(physician);
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const deletePatient = async (req: Request, res: Response) => {
	try {
		const physician = await Physician.findOneAndDelete({
			_id: new ObjectId(req.params.id),
		});

		if (!physician) {
			console.log('Not Found');
			res.status(404).json({
				message: PhysicianErrors.NO_PHYSICIAN_FOUND,
			});
		}

		res.status(204).end();
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

export { add, getPhysicians, getPhysician, updatePhysician, deletePatient };
