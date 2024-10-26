import { AppointmentErrors } from '../errors';
import { Request, Response } from 'express';
import { IAppointment } from '../types/custom';
import Appointment from '../models/appointmentModel';
import { ObjectId } from 'mongodb';
import { timeToSave, dateToSave } from '../utils/common';

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
		} = req.body;

		let firstNameLower = new String(firstName).toLowerCase();
		let lastNameLower = new String(lastName).toLowerCase();
		let middleNameLower = new String(middleName).toLowerCase();

		// let newTime = timeToSave(apptTime);
		let newTime = new Date(apptTime).toLocaleTimeString();

		let newDate = dateToSave(apptDate);

		// check if the appointment exists in db
		const appointment: IAppointment | null = await Appointment.findOne({
			firstName: firstNameLower,
			middleName: middleNameLower,
			lastName: lastNameLower,
			apptDate: newDate,
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
			apptDate: newDate,
			reason: reason,
			doctor: doctor,
			appointmentType: appointmentType,
			apptTime: newTime,
			isNewPatient: isNewPatient,
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
		const { today } = req.params;

		if (!today) {
			return res.status(400).json({
				message: AppointmentErrors.APPOINTMENT_DATE_IS_NOT_PROVIDED,
			});
		}
		const appointments: IAppointment[] = await Appointment.find({
			apptDate: today,
		});

		// let newAppointments = appointments.map((item) => {
		//     if(item.apptStatus == 'completed'){
		//         return { ...item, patientStatus: 'existing'}
		//     } else{
		//         return {...item, patientStatus: 'new'}
		//     }
		// });

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
