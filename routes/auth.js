import express from 'express';
import { validateUserRegister, validateUserLogin, verifyToken } from '../middlewares/middlewares.js';
import { loginUser, registerUser } from '../controllers/authController.js';

const router = express.Router();
router.post('/register', validateUserRegister, verifyToken, registerUser);

router.post('/login', validateUserLogin, loginUser);

// router.post('/googlelogin', googleLoginUser);
// router.post('/refresh', requestRefreshToken);

// router.post('/forgot-password', forgotPassword)
// router.post("/newpassword/:token", resetPassword)

export default router;