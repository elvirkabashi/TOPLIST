import express from 'express';

import { authenticateJWT, authorizeRoles } from '../middleware/authMiddleware.js';
import { getAllPages, getPageById, getUsers } from '../controllers/admin.controller.js';


const router = express.Router();

router.get('/pages',authenticateJWT, authorizeRoles('admin'), getAllPages)
router.get('/pages/:id',authenticateJWT, authorizeRoles('admin'), getPageById)
router.get('/users',authenticateJWT, authorizeRoles('admin'), getUsers)


export default router;