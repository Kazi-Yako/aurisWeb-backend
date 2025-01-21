import express from 'express';
import { protect } from '../middleware/authMiddleware';
import * as medicalHistoryController from '../controllers/medicalHistoryController';

const medicalHistoryRouter = express.Router();

medicalHistoryRouter
	.route('/get')
	.get(protect, medicalHistoryController.getMedicalRecords);

medicalHistoryRouter
	.route('/getpatientrecords')
	.get(protect, medicalHistoryController.getPatientMedicalRecords);

export default medicalHistoryRouter;
