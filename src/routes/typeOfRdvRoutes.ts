import express from 'express';
import { protect } from '../middleware/authMiddleware';
import * as typeOfRdvController from '../controllers/typeOfRdvController';

const typeOfRdvRouter = express.Router();

typeOfRdvRouter.route('/add').post(protect, typeOfRdvController.add);

typeOfRdvRouter.route('/get').get(protect, typeOfRdvController.getTypeOfRdvs);

typeOfRdvRouter
	.route('/gettypeofrdv/:id')
	.get(protect, typeOfRdvController.getTypeOfRdv);

typeOfRdvRouter
	.route('/update/:id')
	.put(protect, typeOfRdvController.updateTypeOfRdv);

typeOfRdvRouter
	.route('/delete/:id')
	.delete(protect, typeOfRdvController.deleteTypeOfRdv);

export default typeOfRdvRouter;
