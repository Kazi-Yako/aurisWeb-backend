import express from 'express';
import { protect } from '../middleware/authMiddleware';
import * as physicianController from '../controllers/physicianController';

const physicianRouter = express.Router();

physicianRouter.route('/add').post(protect, physicianController.add);

physicianRouter.route('/get').get(protect, physicianController.getPhysicians);

physicianRouter
	.route('/getpatient/:id')
	.get(protect, physicianController.getPhysician);

physicianRouter
	.route('/update/:id')
	.put(protect, physicianController.updatePhysician);

physicianRouter
	.route('/delete/:id')
	.delete(protect, physicianController.deletePatient);

export default physicianRouter;
