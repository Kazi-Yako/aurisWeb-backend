import express from 'express';
import { protect } from '../middleware/authMiddleware';
import * as cityController from '../controllers/cityController';

const cityRoutes = express.Router();

cityRoutes.route('/add').post(protect, cityController.addCity);

cityRoutes.route('/get').get(protect, cityController.getCities);

cityRoutes
	.route('/getCitiesOfState/:shortName')
	.get(protect, cityController.getCitiesOfState);

cityRoutes
	.route('/getCitiesOfCountry/:code')
	.get(protect, cityController.getCitiesOfCountry);

cityRoutes.route('/getCity/:id').get(protect, cityController.getCity);

cityRoutes.route('/delete/:id').delete(protect, cityController.deleteCity);

export default cityRoutes;
