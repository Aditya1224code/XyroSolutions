import express from 'express';
import {
  getWork,
  getWorkByCategory,
  getWorkItem,
  createWork,
  updateWork,
  deleteWork,
  updateWorkOrder
} from '../controllers/workController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getWork);
router.get('/category/:category', getWorkByCategory);
router.get('/:id', getWorkItem);

// Protected routes (Admin only)
router.post('/', protect, createWork);
router.put('/:id', protect, updateWork);
router.delete('/:id', protect, deleteWork);
router.patch('/:id/order', protect, updateWorkOrder);

export default router;