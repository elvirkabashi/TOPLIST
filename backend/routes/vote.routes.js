import express from 'express';
import { authenticateJWT } from '../middleware/authMiddleware.js';
import { votePage } from '../controllers/vote.controller.js';

const router = express.Router();

router.post('/vote/:pageId', votePage)


export default router