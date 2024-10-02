import express from 'express';
import { protect } from '../middleware/authMiddleware';
import * as appointmentTypeController from '../controllers/appointmentTypeController';

const appointmentTypeRouter = express.Router();

appointmentTypeRouter
	.route('/add')
	.post(protect, appointmentTypeController.add);

appointmentTypeRouter
	.route('/get')
	.get(protect, appointmentTypeController.getAppointmentTypes);

appointmentTypeRouter
	.route('/getAppointmentType/:id')
	.get(protect, appointmentTypeController.getAppointmentType);

appointmentTypeRouter
	.route('/update/:id')
	.put(protect, appointmentTypeController.updateAppointmentType);

appointmentTypeRouter
	.route('/delete/:id')
	.delete(protect, appointmentTypeController.deleteAppointmentType);

export default appointmentTypeRouter;
