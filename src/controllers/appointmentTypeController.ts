import { TypeOfRdvErrors } from '../errors';
import { Request, Response } from 'express';
import { ITypeOfAppointment } from '../types/custom';
import TypeOfRdv from '../models/typeOfRdvModel';
import { ObjectId } from 'mongodb';

const add = async (req: Request, res: Response) => {
	try {
		let { name, shortName, description } = req.body;

		let nameLower = new String(name).toLowerCase();
		let shortNameLower = new String(shortName).toLowerCase();
		let descriptionLower = new String(description).toLowerCase();

		// check if the type of RDV exists in db
		const typeOfRdv: ITypeOfAppointment | null = await TypeOfRdv.findOne({
			name: nameLower,
			shortName: shortNameLower,
		});

		if (typeOfRdv) {
			return res
				.status(400)
				.json({ message: TypeOfRdvErrors.TYPE_OF_RDV_ALREADY_EXISTS });
		}

		// create new type of RDV document in db
		let newTypeOfRdv = new TypeOfRdv({
			name: nameLower,
			shortName: shortNameLower,
			description: descriptionLower,
		});

		await newTypeOfRdv.save();

		res.status(200).json({
			message: 'A new type of Appointment is added successfully',
		});
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const getAppointmentTypes = async (req: Request, res: Response) => {
	try {
		const typeOfRdvs: ITypeOfAppointment[] = await TypeOfRdv.find({});

		res.status(200).json(typeOfRdvs);
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const getAppointmentType = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res
				.status(400)
				.json({ message: TypeOfRdvErrors.TYPE_OF_RDV_ID_IS_REQUIRED });
		}

		const typeOfRdv = await TypeOfRdv.findOne({ _id: new ObjectId(id) });

		if (!typeOfRdv) {
			return res
				.status(404)
				.json({ message: TypeOfRdvErrors.NO_TYPE_OF_RDV_FOUND });
		}

		res.status(200).json(typeOfRdv);
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const updateAppointmentType = async (req: Request, res: Response) => {
	try {
		const typeOfRdv = await TypeOfRdv.findOneAndUpdate(
			{ _id: new ObjectId(req.params.id) },
			{
				$set: req.body,
			},
			{
				returnDocument: 'after',
			}
		);

		if (!typeOfRdv) {
			console.log('Not Found');
			res.status(404).json({
				message: TypeOfRdvErrors.NO_TYPE_OF_RDV_FOUND,
			});
		}

		res.status(200).json(typeOfRdv);
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const deleteAppointmentType = async (req: Request, res: Response) => {
	try {
		const typeOfRdv = await TypeOfRdv.findOneAndDelete({
			_id: new ObjectId(req.params.id),
		});

		if (!typeOfRdv) {
			console.log('Not Found');
			res.status(404).json({
				message: TypeOfRdvErrors.NO_TYPE_OF_RDV_FOUND,
			});
		}

		res.status(204).end();
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

export {
	add,
	getAppointmentTypes,
	getAppointmentType,
	updateAppointmentType,
	deleteAppointmentType,
};
