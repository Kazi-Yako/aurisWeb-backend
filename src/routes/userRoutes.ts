import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { authorizeRoles } from '../middleware/authorizeRoles';
import * as userController from '../controllers/userController';
import { upload } from '../controllers/uploadController';
import { ROLE_PERMISSIONS } from '../config/rolesConfig';

const router = express.Router();

router.post(
	'/register',
	protect,
	authorizeRoles(...ROLE_PERMISSIONS.USERS),
	userController.registerUser,
);
router.post('/login', userController.loginUser);
router.route('/profile').get(protect, userController.getUserProfile);
router
	.route('/getUsers')
	.get(
		protect,
		authorizeRoles(...ROLE_PERMISSIONS.USERS),
		userController.getUsers,
	);
router
	.route('/getUser/:id')
	.get(
		protect,
		authorizeRoles(...ROLE_PERMISSIONS.USERS),
		userController.getUserById,
	);
router
	.route('/updateUser/:id')
	.put(
		upload.single('image'),
		protect,
		authorizeRoles(...ROLE_PERMISSIONS.USERS),
		userController.updateUser,
	);
router.route('/updatePassword/:id').put(protect, userController.updatePassword);

export default router;
