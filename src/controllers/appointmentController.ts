import { AppointmentErrors } from '../errors';
import { Request, Response } from 'express';
import { IAppointment } from '../types/custom';
import Appointment from '../models/appointmentModel';
import { ObjectId } from 'mongodb';

const add = async (req: Request, res: Response) => {
	try {
		let {
			firstName,
			middleName,
			lastName,
			reason,
			doctor,
			appointmentType,
			apptDate,
			apptTime,
			isNewPatient,
			allergies,
			medicalHistory,
			medications,
		} = req.body;

		let firstNameLower = new String(firstName).toLowerCase();
		let lastNameLower = new String(lastName).toLowerCase();
		let middleNameLower = new String(middleName).toLowerCase();

		// check if the appointment exists in db
		const appointment: IAppointment | null = await Appointment.findOne({
			firstName: firstNameLower,
			middleName: middleNameLower,
			lastName: lastNameLower,
			apptDate,
		});

		if (appointment) {
			return res.status(400).json({
				message: AppointmentErrors.APPOINTMENT_ALREADY_EXISTS,
			});
		}

		// create new appointment document in db
		let newAppointment = new Appointment({
			firstName: firstNameLower,
			middleName: middleNameLower,
			lastName: lastNameLower,
			apptDate,
			reason: reason,
			doctor: doctor,
			appointmentType: appointmentType,
			apptTime,
			isNewPatient: isNewPatient,
			allergies,
			medicalHistory,
			medications,
		});

		await newAppointment.save();

		res.status(200).json({
			message: 'A new Appointment is added successfully',
		});
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const getAppointments = async (req: Request, res: Response) => {
	try {
		const appointments: IAppointment[] = await Appointment.find({});

		res.status(200).json(appointments);
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const getTodayAppointments = async (req: Request, res: Response) => {
	try {
		const beginOfDate = new Date().setHours(0, 0, 0, 0);

		const endOfDate = new Date().setHours(23, 59, 59, 999);

		const appointments: IAppointment[] = await Appointment.find({
			apptDate: {
				$gte: beginOfDate,
				$lt: endOfDate,
			},
		});

		res.status(200).json(appointments);
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const getAppointment = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res
				.status(400)
				.json({ message: AppointmentErrors.APPOINTMENT_NOT_FOUND });
		}

		const appointment = await Appointment.findOne({
			_id: new ObjectId(id),
		});

		if (!appointment) {
			return res
				.status(404)
				.json({ message: AppointmentErrors.APPOINTMENT_NOT_FOUND });
		}

		res.status(200).json(appointment);
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const updateAppointment = async (req: Request, res: Response) => {
	try {
		const appointment = await Appointment.findOneAndUpdate(
			{ _id: new ObjectId(req.params.id) },
			{
				$set: req.body,
			},
			{
				returnDocument: 'after',
			}
		);

		if (!appointment) {
			console.log('Not Found');
			res.status(404).json({
				message: AppointmentErrors.APPOINTMENT_NOT_FOUND,
			});
		}

		res.status(200).json(appointment);
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const deleteAppointment = async (req: Request, res: Response) => {
	try {
		const appointment = await Appointment.findOneAndDelete({
			_id: new ObjectId(req.params.id),
		});

		if (!appointment) {
			console.log('Not Found');
			res.status(404).json({
				message: AppointmentErrors.APPOINTMENT_NOT_FOUND,
			});
		}

		res.status(204).end();
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

export {
	add,
	getAppointments,
	getAppointment,
	updateAppointment,
	deleteAppointment,
	getTodayAppointments,
};
