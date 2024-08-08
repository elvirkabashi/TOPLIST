import express from 'express';
import { authenticateJWT, authorizeRoles } from '../middleware/authMiddleware.js';
import { getToplist } from '../controllers/toplist.controller.js';

const router = express.Router();


router.get('/toplist',getToplist)



export default router;