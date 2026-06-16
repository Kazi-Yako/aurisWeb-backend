import express from 'express';
import { protect } from '../middleware/authMiddleware';
import * as physicianController from '../controllers/physicianController';
import { authorizeRoles } from '../middleware/authorizeRoles';
import { ROLE_PERMISSIONS } from '../config/rolesConfig';

const physicianRouter = express.Router();

physicianRouter
	.route('/add')
	.post(
		protect,
		authorizeRoles(...ROLE_PERMISSIONS.PHYSICIANS_CREATE),
		physicianController.add,
	);

physicianRouter.route('/get').get(protect, physicianController.getPhysicians);

physicianRouter
	.route('/getphysician/:id')
	.get(
		protect,
		authorizeRoles(...ROLE_PERMISSIONS.PHYSICIANS_CREATE),
		physicianController.getPhysician,
	);

physicianRouter
	.route('/update/:id')
	.put(
		protect,
		authorizeRoles(...ROLE_PERMISSIONS.PHYSICIANS_CREATE),
		physicianController.updatePhysician,
	);

physicianRouter
	.route('/delete/:id')
	.delete(
		protect,
		authorizeRoles(...ROLE_PERMISSIONS.PHYSICIANS_CREATE),
		physicianController.deletePatient,
	);

export default physicianRouter;
