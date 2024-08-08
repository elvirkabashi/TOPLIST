import express from 'express';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../controllers/category.controller.js';
import { authenticateJWT, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/categories',authenticateJWT,authorizeRoles('admin'),createCategory)
router.get('/categories',getCategories)
router.put('/categories/:id',authenticateJWT,authorizeRoles('admin'),updateCategory)
router.delete('/categories/:id',authenticateJWT,authorizeRoles('admin'),deleteCategory)




export default router;