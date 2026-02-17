import Work from '../models/Work.js';

// @desc    Get all work items
// @route   GET /api/work
// @access  Public
export const getWork = async (req, res) => {
  try {
    const { category } = req.query;
    
    let query = { isActive: true };
    if (category && category !== 'all') {
      query.category = category;
    }

    const work = await Work.find(query)
      .sort({ order: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: work.length,
      data: work
    });
  } catch (error) {
    console.error('Error fetching work:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch work items'
    });
  }
};

// @desc    Get work by category
// @route   GET /api/work/category/:category
// @access  Public
export const getWorkByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    const work = await Work.find({ 
      category: category, 
      isActive: true 
    }).sort({ order: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: work.length,
      data: work
    });
  } catch (error) {
    console.error('Error fetching work by category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch work items for this category'
    });
  }
};

// @desc    Get single work item
// @route   GET /api/work/:id
// @access  Public
export const getWorkItem = async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);

    if (!work) {
      return res.status(404).json({
        success: false,
        message: 'Work item not found'
      });
    }

    res.status(200).json({
      success: true,
      data: work
    });
  } catch (error) {
    console.error('Error fetching work item:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch work item'
    });
  }
};

// @desc    Create new work item
// @route   POST /api/work
// @access  Private (Admin only)
export const createWork = async (req, res) => {
  try {
    const work = await Work.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Work item created successfully',
      data: work
    });
  } catch (error) {
    console.error('Error creating work:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create work item'
    });
  }
};

// @desc    Update work item
// @route   PUT /api/work/:id
// @access  Private (Admin only) 
export const updateWork = async (req, res) => {
  try {
    const work = await Work.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!work) {
      return res.status(404).json({
        success: false,
        message: 'Work item not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Work item updated successfully',
      data: work
    });
  } catch (error) {
    console.error('Error updating work:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update work item'
    });
  }
};

// @desc    Delete work item
// @route   DELETE /api/work/:id
// @access  Private (Admin only)
export const deleteWork = async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);

    if (!work) {
      return res.status(404).json({
        success: false,
        message: 'Work item not found'
      });
    }

    await Work.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Work item deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting work:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete work item'
    });
  }
};

// @desc    Update work item order
// @route   PATCH /api/work/:id/order
// @access  Private (Admin only)
export const updateWorkOrder = async (req, res) => {
  try {
    const { order } = req.body;

    const work = await Work.findByIdAndUpdate(
      req.params.id,
      { order },
      { new: true }
    );

    if (!work) {
      return res.status(404).json({
        success: false,
        message: 'Work item not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Work order updated successfully',
      data: work
    });
  } catch (error) {
    console.error('Error updating work order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update work order'
    });
  }
};