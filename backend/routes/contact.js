import express from 'express';
import { body } from 'express-validator';
import { 
  submitContact, 
  getContacts, 
  getContact, 
  updateContact, 
  deleteContact 
} from '../controllers/contactController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

// Validation rules
const contactValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('message')
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10 }).withMessage('Message must be at least 10 characters')
];

const updateValidation = [
  body('status')
    .optional()
    .isIn(['new', 'read', 'replied', 'archived'])
    .withMessage('Invalid status')
];

// Public routes
router.post('/', contactValidation, validate, submitContact);

// Protected routes (Admin only)
router.get('/', protect, authorize('admin'), getContacts);
router.get('/:id', protect, authorize('admin'), getContact);
router.put('/:id', protect, authorize('admin'), updateValidation, validate, updateContact);
router.delete('/:id', protect, authorize('admin'), deleteContact);

export default router;
