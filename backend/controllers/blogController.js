import BlogPost from '../models/BlogPost.js';

// @desc    Get all blog posts
// @route   GET /api/blog
// @access  Public
export const getPosts = async (req, res, next) => {
  try {
    const { status, tag, page = 1, limit = 10, all } = req.query;
    
    // Build query
    const query = {};
    
    // For public, only show published posts
    if (!req.user) {
      query.status = 'published';
    } else if (status) {
      query.status = status;
    }
    
    if (tag) {
      query.tags = tag;
    }

    // Pagination (skip for all=true)
    const skip = all ? 0 : (page - 1) * limit;
    const limitNum = all ? 0 : parseInt(limit);
    
    let postsQuery = BlogPost.find(query)
      .sort({ publishedAt: -1, createdAt: -1 });
    
    if (!all) {
      postsQuery = postsQuery.skip(skip).limit(limitNum);
    }
    
    const posts = await postsQuery;
    const total = await BlogPost.countDocuments(query);

    res.status(200).json({
      success: true,
      count: posts.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: posts
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single blog post
// @route   GET /api/blog/:slug
// @access  Public
export const getPost = async (req, res, next) => {
  try {
    const { slug } = req.params;
    
    // Find by slug or ID
    let post = await BlogPost.findOne({ slug });
    
    if (!post) {
      // Try finding by ID
      post = await BlogPost.findById(slug);
    }

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Only show published posts to public
    if (!req.user && post.status !== 'published') {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Increment views
    post.views += 1;
    await post.save();

    res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create blog post
// @route   POST /api/blog
// @access  Private (Admin)
export const createPost = async (req, res, next) => {
  try {
    const { title, excerpt, content, image, tags, status } = req.body;

    const post = await BlogPost.create({
      title,
      excerpt,
      content,
      image,
      tags: tags || [],
      status: status || 'draft',
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: post
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update blog post
// @route   PUT /api/blog/:id
// @access  Private (Admin)
export const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    let post = await BlogPost.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Update fields
    Object.keys(updateData).forEach(key => {
      if (updateData[key] !== undefined) {
        post[key] = updateData[key];
      }
    });
    
    post.updatedBy = req.user.id;
    await post.save();

    res.status(200).json({
      success: true,
      message: 'Blog post updated successfully',
      data: post
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete blog post
// @route   DELETE /api/blog/:id
// @access  Private (Admin)
export const deletePost = async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    await post.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all tags
// @route   GET /api/blog/tags
// @access  Public
export const getTags = async (req, res, next) => {
  try {
    const tags = await BlogPost.distinct('tags', { status: 'published' });

    res.status(200).json({
      success: true,
      data: tags
    });
  } catch (error) {
    next(error);
  }
};
