import express from 'express';
import { protect } from '../middleware/authMiddleware';
import * as stateController from '../controllers/stateController';

const stateRoutes = express.Router();

stateRoutes.route('/add').post(protect, stateController.addState);

stateRoutes.route('/get').get(protect, stateController.getStates);

stateRoutes
	.route('/getStatesOfCountry/:code')
	.get(protect, stateController.getStatesOfCountry);

stateRoutes.route('/getState/:id').get(protect, stateController.getState);

stateRoutes.route('/delete/:id').delete(protect, stateController.deleteState);

export default stateRoutes;
