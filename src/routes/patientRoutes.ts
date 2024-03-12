import express from 'express';
import { protect } from '../middleware/authMiddleware';
import * as patientController from '../controllers/patientController';

const patientRouter = express.Router();

patientRouter.route('/add').post(protect, patientController.add);

export default patientRouter;
