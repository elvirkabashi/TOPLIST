import express from 'express';

import { authenticateJWT, authorizeRoles } from '../middleware/authMiddleware.js';
import { createOrUpdateRule, getRules } from '../controllers/rule.controller.js';

const router = express.Router();

router.post('/rules',authenticateJWT,authorizeRoles('admin'), createOrUpdateRule)
router.get('/rules',getRules)


export default router;