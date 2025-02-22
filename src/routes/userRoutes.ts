import express from 'express';
import { protect } from '../middleware/authMiddleware';
import * as userController from '../controllers/userController';

const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.route('/profile').get(protect, userController.getUserProfile);
router.route('/getUsers').get(protect, userController.getUsers);
router.route('/getUser/:id').get(protect, userController.getUserById);
router.route('/updateUser/:id').put(protect, userController.updateUser);
router.route('/updatePassword/:id').put(protect, userController.updatePassword);

export default router;
