import express from 'express';
import { protect } from '../middleware/authMiddleware';
import * as diagnosisController from '../controllers/diagnosisController';

const diagnosisRouter = express.Router();

diagnosisRouter.route('/add').post(protect, diagnosisController.add);

diagnosisRouter.route('/get').get(protect, diagnosisController.getDiagnoses);

diagnosisRouter
	.route('/getdiagnosis/:id')
	.get(protect, diagnosisController.getDiagnosis);

diagnosisRouter
	.route('/delete/:id')
	.delete(protect, diagnosisController.deleteDiagnosis);

export default diagnosisRouter;
