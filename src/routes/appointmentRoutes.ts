import express from 'express';
import { protect } from '../middleware/authMiddleware';
import * as appointmentController from '../controllers/appointmentController';

const appointmentRoutes = express.Router();

appointmentRoutes.route('/add').post(protect, appointmentController.add);

appointmentRoutes
	.route('/get')
	.get(protect, appointmentController.getAppointments);

appointmentRoutes
	.route('/getAppointment/:id')
	.get(protect, appointmentController.getAppointment);

appointmentRoutes
	.route('/update/:id')
	.put(protect, appointmentController.updateAppointment);

appointmentRoutes
	.route('/delete/:id')
	.delete(protect, appointmentController.deleteAppointment);

export default appointmentRoutes;
