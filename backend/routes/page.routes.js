import express from 'express';
import { createPage, deletePage, getPageById, getUserPages, updatePage } from '../controllers/page.controller.js';
import { authenticateJWT } from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/pages/:categoryId',authenticateJWT ,createPage)
router.get('/pages',authenticateJWT ,getUserPages)
router.get('/pages/:id',authenticateJWT ,getPageById)
router.put('/pages/:id',authenticateJWT ,updatePage)
router.delete('/pages/:id',authenticateJWT ,deletePage)



export default router;