import express from 'express';
import { login, logout, postUserDetails, signup, userDetails } from '../controllers/user.controller.js';
import { authenticateJWT } from '../middleware/authMiddleware.js';

const router = express.Router();



router.post('/signup',signup)

router.post('/login',login)

router.post('/logout',logout)

router.get('/user',authenticateJWT , userDetails)

router.post('/userDetails',authenticateJWT , postUserDetails)


export default router;