import express from 'express';
import { protect } from '../middleware/authMiddleware';
import * as medicalHistoryController from '../controllers/medicalHistoryController';
import { authorizeRoles } from '../middleware/authorizeRoles';
import { ROLE_PERMISSIONS } from '../config/rolesConfig';

const medicalHistoryRouter = express.Router();

medicalHistoryRouter
	.route('/get')
	.get(
		protect,
		authorizeRoles(...ROLE_PERMISSIONS.MEDICAL_HISTORY),
		medicalHistoryController.getMedicalRecords,
	);

medicalHistoryRouter
	.route('/getpatientrecords')
	.get(
		protect,
		authorizeRoles(...ROLE_PERMISSIONS.MEDICAL_HISTORY),
		medicalHistoryController.getPatientMedicalRecords,
	);

export default medicalHistoryRouter;
