import { appointmentTypeModelErrors } from '../errors';
import { Request, Response } from 'express';
import { IAppointmentType } from '../types/custom';
import appointmentType from '../models/appointmentTypeModel';
import { ObjectId } from 'mongodb';

const add = async (req: Request, res: Response) => {
	try {
		let { name, shortName, description } = req.body;

		let nameLower = new String(name).toLowerCase();
		let shortNameLower = new String(shortName).toLowerCase();
		let descriptionLower = new String(description).toLowerCase();

		// check if the type of RDV exists in db
		const appointmentTypeModel: IAppointmentType | null =
			await appointmentType.findOne({
				name: nameLower,
				shortName: shortNameLower,
			});

		if (appointmentTypeModel) {
			return res.status(400).json({
				message:
					appointmentTypeModelErrors.APPOINTMENT_TYPE_ALREADY_EXISTS,
			});
		}

		// create new type of RDV document in db
		let newappointmentTypeModel = new appointmentType({
			name: nameLower,
			shortName: shortNameLower,
			description: descriptionLower,
		});

		await newappointmentTypeModel.save();

		res.status(200).json({
			message: 'A new type of Appointment is added successfully',
		});
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const getAppointmentTypes = async (req: Request, res: Response) => {
	try {
		const appointmentTypeModels: IAppointmentType[] =
			await appointmentType.find({});

		res.status(200).json(appointmentTypeModels);
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const getAppointmentType = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({
				message:
					appointmentTypeModelErrors.APPOINTMENT_TYPE_IS_REQUIRED,
			});
		}

		const appointmentTypeModel = await appointmentType.findOne({
			_id: new ObjectId(id),
		});

		if (!appointmentTypeModel) {
			return res.status(404).json({
				message: appointmentTypeModelErrors.NO_APPOINTMENT_TYPE_FOUND,
			});
		}

		res.status(200).json(appointmentTypeModel);
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const updateAppointmentType = async (req: Request, res: Response) => {
	try {
		const appointmentTypeModel = await appointmentType.findOneAndUpdate(
			{ _id: new ObjectId(req.params.id) },
			{
				$set: req.body,
			},
			{
				returnDocument: 'after',
			},
		);

		if (!appointmentTypeModel) {
			console.log('Not Found');
			res.status(404).json({
				message: appointmentTypeModelErrors.NO_APPOINTMENT_TYPE_FOUND,
			});
		}

		res.status(200).json(appointmentTypeModel);
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const deleteAppointmentType = async (req: Request, res: Response) => {
	try {
		const appointmentTypeModel = await appointmentType.findOneAndDelete({
			_id: new ObjectId(req.params.id),
		});

		if (!appointmentTypeModel) {
			console.log('Not Found');
			res.status(404).json({
				message: appointmentTypeModelErrors.NO_APPOINTMENT_TYPE_FOUND,
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
