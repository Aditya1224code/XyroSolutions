import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if Cloudinary is configured
const useCloudinary = process.env.CLOUDINARY_CLOUD_NAME && 
                      process.env.CLOUDINARY_API_KEY && 
                      process.env.CLOUDINARY_API_SECRET;

// @desc    Upload image
// @route   POST /api/upload
// @access  Private (Admin)
export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file'
      });
    }

    // File info
    const file = req.file;

    // Cloudinary stores URL in path, local storage needs to construct URL
    let fileUrl;
    let filename;

    if (useCloudinary) {
      // Cloudinary upload - URL is in file.path
      fileUrl = file.path;
      filename = file.filename; // This is the public_id in Cloudinary
    } else {
      // Local storage
      const baseUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5000}`;
      fileUrl = `${baseUrl}/uploads/${file.filename}`;
      filename = file.filename;
    }

    res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        filename: filename,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        url: fileUrl
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload multiple images
// @route   POST /api/upload/multiple
// @access  Private (Admin)
export const uploadMultiple = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please upload at least one file'
      });
    }

    const baseUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5000}`;

    const files = req.files.map(file => {
      let fileUrl;
      let filename;

      if (useCloudinary) {
        fileUrl = file.path;
        filename = file.filename;
      } else {
        fileUrl = `${baseUrl}/uploads/${file.filename}`;
        filename = file.filename;
      }

      return {
        filename: filename,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        url: fileUrl
      };
    });

    res.status(200).json({
      success: true,
      message: `${files.length} files uploaded successfully`,
      data: files
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete image
// @route   DELETE /api/upload/:filename
// @access  Private (Admin)
export const deleteImage = async (req, res, next) => {
  try {
    const { filename } = req.params;

    if (useCloudinary) {
      // Delete from Cloudinary
      const { cloudinary } = await import('../config/cloudinary.js');
      await cloudinary.uploader.destroy(filename);
    } else {
      // Delete from local storage
      const filePath = path.join(__dirname, '..', 'uploads', filename);

      // Check if file exists
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({
          success: false,
          message: 'File not found'
        });
      }

      // Delete file
      fs.unlinkSync(filePath);
    }

    res.status(200).json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all uploaded files
// @route   GET /api/upload
// @access  Private (Admin)
export const getFiles = async (req, res, next) => {
  try {
    let files = [];

    if (useCloudinary) {
      // Get files from Cloudinary
      const { cloudinary } = await import('../config/cloudinary.js');
      const result = await cloudinary.api.resources({
        type: 'upload',
        prefix: 'nexgen-studio',
        max_results: 100
      });

      files = result.resources.map(resource => ({
        filename: resource.public_id,
        url: resource.secure_url,
        size: resource.bytes,
        createdAt: resource.created_at,
        format: resource.format
      }));
    } else {
      // Get files from local storage
      const uploadsDir = path.join(__dirname, '..', 'uploads');
      
      // Create uploads directory if it doesn't exist
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const baseUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5000}`;

      files = fs.readdirSync(uploadsDir).map(filename => {
        const filePath = path.join(uploadsDir, filename);
        const stats = fs.statSync(filePath);
        
        return {
          filename,
          url: `${baseUrl}/uploads/${filename}`,
          size: stats.size,
          createdAt: stats.birthtime
        };
      });
    }

    res.status(200).json({
      success: true,
      count: files.length,
      data: files
    });
  } catch (error) {
    next(error);
  }
};
