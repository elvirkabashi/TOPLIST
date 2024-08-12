import express from 'express';
import { addHit, createPage, deletePage, getPageById, getPageHits, getUserPages, updatePage } from '../controllers/page.controller.js';
import { authenticateJWT } from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/pages',authenticateJWT ,createPage)
router.get('/pages',authenticateJWT ,getUserPages)
router.get('/pages/:id',getPageById)
router.put('/pages/:id',authenticateJWT ,updatePage)
router.delete('/pages/:id',authenticateJWT ,deletePage)


router.post('/hit', addHit)
router.get('/hits',authenticateJWT, getPageHits)


export default router;