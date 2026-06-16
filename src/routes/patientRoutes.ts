import express from 'express';
import { protect } from '../middleware/authMiddleware';
import * as patientController from '../controllers/patientController';
import { authorizeRoles } from '../middleware/authorizeRoles';
import { ROLE_PERMISSIONS } from '../config/rolesConfig';

const patientRouter = express.Router();

patientRouter.route('/add').post(protect, patientController.add);

patientRouter.route('/get').get(protect, patientController.getPatients);

patientRouter
	.route('/getpatient/:id')
	.get(protect, patientController.getPatient);

patientRouter
	.route('/update/:id')
	.put(protect, patientController.updatePatient);

patientRouter
	.route('/delete/:id')
	.delete(
		protect,
		authorizeRoles(...ROLE_PERMISSIONS.PATIENTS_DELETE),
		patientController.deletePatient,
	);

patientRouter.route('/search').get(protect, patientController.searchPatients);

export default patientRouter;
