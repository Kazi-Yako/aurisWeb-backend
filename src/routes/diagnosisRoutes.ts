import express from 'express';
import { protect } from '../middleware/authMiddleware';
import * as diagnosisController from '../controllers/diagnosisController';
import { authorizeRoles } from '../middleware/authorizeRoles';
import { ROLE_PERMISSIONS } from '../config/rolesConfig';

const diagnosisRouter = express.Router();

diagnosisRouter
	.route('/add')
	.post(
		protect,
		authorizeRoles(...ROLE_PERMISSIONS.DIAGNOSIS),
		diagnosisController.add,
	);

diagnosisRouter
	.route('/get')
	.get(
		protect,
		authorizeRoles(...ROLE_PERMISSIONS.DIAGNOSIS),
		diagnosisController.getDiagnoses,
	);

diagnosisRouter
	.route('/getdiagnosis/:id')
	.get(
		protect,
		authorizeRoles(...ROLE_PERMISSIONS.DIAGNOSIS),
		diagnosisController.getDiagnosis,
	);

diagnosisRouter
	.route('/delete/:id')
	.delete(
		protect,
		authorizeRoles(...ROLE_PERMISSIONS.DIAGNOSIS_DELETE),
		diagnosisController.deleteDiagnosis,
	);

export default diagnosisRouter;
