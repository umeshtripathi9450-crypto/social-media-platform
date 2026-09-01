const express = require('express');
const authenticateToken = require('../middleware/auth');
const Bookmark = require('../models/Bookmark');
const Post = require('../models/Post');
const { successResponse, errorResponse, getPagination, formatPaginationMeta } = require('../utils/responseUtils');

const router = express.Router();

/**
 * POST /api/bookmarks/:postId
 * Bookmark a post
 */
router.post('/:postId', authenticateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return errorResponse(res, 'Post not found', null, 404);
    }

    let bookmark = await Bookmark.findOne({
      user: req.user.id,
      post: req.params.postId
    });

    if (bookmark) {
      return errorResponse(res, 'Post already bookmarked', null, 400);
    }

    bookmark = new Bookmark({
      user: req.user.id,
      post: req.params.postId
    });

    await bookmark.save();
    successResponse(res, 'Post bookmarked', bookmark, 201);
  } catch (error) {
    errorResponse(res, 'Server error', error.message, 500);
  }
});

/**
 * GET /api/bookmarks
 * Get all bookmarks for current user
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req.query.page, req.query.limit);

    const bookmarks = await Bookmark.find({ user: req.user.id })
      .populate({
        path: 'post',
        populate: 'author'
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Bookmark.countDocuments({ user: req.user.id });

    successResponse(res, 'Bookmarks retrieved', {
      bookmarks,
      pagination: formatPaginationMeta(page, limit, total)
    });
  } catch (error) {
    errorResponse(res, 'Server error', error.message, 500);
  }
});

/**
 * DELETE /api/bookmarks/:postId
 * Remove bookmark
 */
router.delete('/:postId', authenticateToken, async (req, res) => {
  try {
    const bookmark = await Bookmark.findOneAndDelete({
      user: req.user.id,
      post: req.params.postId
    });

    if (!bookmark) {
      return errorResponse(res, 'Bookmark not found', null, 404);
    }

    successResponse(res, 'Bookmark removed');
  } catch (error) {
    errorResponse(res, 'Server error', error.message, 500);
  }
});

/**
 * GET /api/bookmarks/:postId/check
 * Check if post is bookmarked
 */
router.get('/:postId/check', authenticateToken, async (req, res) => {
  try {
    const bookmark = await Bookmark.findOne({
      user: req.user.id,
      post: req.params.postId
    });

    successResponse(res, 'Check complete', { isBookmarked: !!bookmark });
  } catch (error) {
    errorResponse(res, 'Server error', error.message, 500);
  }
});

module.exports = router;
