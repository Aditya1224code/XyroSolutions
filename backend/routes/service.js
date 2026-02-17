import express from 'express';
import {
  getServices,
  getServicesByCategory,
  getService,
  createService,
  updateService,
  deleteService,
  updateServiceOrder,
  getFeaturedServices
} from '../controllers/serviceController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getServices);
router.get('/featured', getFeaturedServices);
router.get('/category/:category', getServicesByCategory);
router.get('/:id', getService);

// Protected routes (Admin only)
router.post('/', protect, createService);
router.put('/:id', protect, updateService);
router.delete('/:id', protect, deleteService);
router.patch('/:id/order', protect, updateServiceOrder);

export default router;