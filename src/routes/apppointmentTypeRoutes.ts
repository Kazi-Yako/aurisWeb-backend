import express from 'express';
import { protect } from '../middleware/authMiddleware';
import * as appointmentTypeController from '../controllers/appointmentTypeController';
import { authorizeRoles } from '../middleware/authorizeRoles';
import { ROLE_PERMISSIONS } from '../config/rolesConfig';

const appointmentTypeRouter = express.Router();

appointmentTypeRouter
	.route('/add')
	.post(
		protect,
		authorizeRoles(...ROLE_PERMISSIONS.APPOINTMENT_TYPES_CREATE),
		appointmentTypeController.add,
	);

appointmentTypeRouter
	.route('/get')
	.get(protect, appointmentTypeController.getAppointmentTypes);

appointmentTypeRouter
	.route('/getAppointmentType/:id')
	.get(protect, appointmentTypeController.getAppointmentType);

appointmentTypeRouter
	.route('/update/:id')
	.put(
		protect,
		authorizeRoles(...ROLE_PERMISSIONS.APPOINTMENT_TYPES_CREATE),
		appointmentTypeController.updateAppointmentType,
	);

appointmentTypeRouter
	.route('/delete/:id')
	.delete(
		protect,
		authorizeRoles(...ROLE_PERMISSIONS.APPOINTMENT_TYPES_CREATE),
		appointmentTypeController.deleteAppointmentType,
	);

export default appointmentTypeRouter;
