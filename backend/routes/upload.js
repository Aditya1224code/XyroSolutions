import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { 
  uploadImage, 
  uploadMultiple, 
  deleteImage, 
  getFiles 
} from '../controllers/uploadController.js';
import { protect, authorize } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Check if Cloudinary is configured
const useCloudinary = process.env.CLOUDINARY_CLOUD_NAME && 
                      process.env.CLOUDINARY_API_KEY && 
                      process.env.CLOUDINARY_API_SECRET;

let storage;
let fileFilter;

if (useCloudinary) {
  // Use Cloudinary storage
  const { storage: cloudinaryStorage } = await import('../config/cloudinary.js');
  storage = cloudinaryStorage;
  fileFilter = null; // Cloudinary handles file filtering
  console.log('📸 Using Cloudinary for file uploads');
} else {
  // Use local disk storage
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: (req, file, cb) => {
      // Generate unique filename
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    }
  });

  // File filter - only allow images
  fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp, svg)'));
    }
  };
  console.log('💾 Using local disk storage for file uploads');
}

// Configure multer
const multerConfig = {
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
};

// Only add fileFilter if using local storage
if (fileFilter) {
  multerConfig.fileFilter = fileFilter;
}

const upload = multer(multerConfig);

// Routes (All protected - Admin only)
router.get('/', protect, authorize('admin'), getFiles);
router.post('/', protect, authorize('admin'), upload.single('image'), uploadImage);
router.post('/multiple', protect, authorize('admin'), upload.array('images', 10), uploadMultiple);
router.delete('/:filename', protect, authorize('admin'), deleteImage);

export default router;
