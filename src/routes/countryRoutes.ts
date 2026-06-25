import express from 'express';
import { protect } from '../middleware/authMiddleware';
import * as countryController from '../controllers/countryController';

const countryRoutes = express.Router();

countryRoutes.route('/add').post(protect, countryController.addCountry);

countryRoutes.route('/get').get(protect, countryController.getCountries);

countryRoutes
	.route('/getCountry/:id')
	.get(protect, countryController.getCountry);

countryRoutes
	.route('/delete/:id')
	.delete(protect, countryController.deleteCountry);

export default countryRoutes;
