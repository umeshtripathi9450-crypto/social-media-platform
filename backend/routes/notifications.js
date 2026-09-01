const express = require('express');
const { body } = require('express-validator');
const authenticateToken = require('../middleware/auth');
const validateInput = require('../middleware/validation');
const Notification = require('../models/Notification');
const { successResponse, errorResponse, getPagination, formatPaginationMeta } = require('../utils/responseUtils');

const router = express.Router();

/**
 * GET /api/notifications
 * Get user notifications with pagination
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req.query.page, req.query.limit);

    const notifications = await Notification.find({ recipient: req.user.id })
      .populate('actor', 'username profile.profilePicture')
      .populate('post', 'content')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Notification.countDocuments({ recipient: req.user.id });

    successResponse(res, 'Notifications retrieved', {
      notifications,
      pagination: formatPaginationMeta(page, limit, total)
    });
  } catch (error) {
    errorResponse(res, 'Server error', error.message, 500);
  }
});

/**
 * GET /api/notifications/unread
 * Get count of unread notifications
 */
router.get('/unread/count', authenticateToken, async (req, res) => {
  try {
    const unreadCount = await Notification.countDocuments({
      recipient: req.user.id,
      isRead: false
    });

    successResponse(res, 'Unread count retrieved', { count: unreadCount });
  } catch (error) {
    errorResponse(res, 'Server error', error.message, 500);
  }
});

/**
 * PUT /api/notifications/:notificationId/read
 * Mark notification as read
 */
router.put('/:notificationId/read', authenticateToken, async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.notificationId,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return errorResponse(res, 'Notification not found', null, 404);
    }

    if (notification.recipient.toString() !== req.user.id) {
      return errorResponse(res, 'Not authorized', null, 403);
    }

    successResponse(res, 'Notification marked as read', notification);
  } catch (error) {
    errorResponse(res, 'Server error', error.message, 500);
  }
});

/**
 * PUT /api/notifications/mark-all-read
 * Mark all notifications as read
 */
router.put('/mark-all/read', authenticateToken, async (req, res) => {
  try {
    await Notification.updateMany(
      { recipient: req.user.id, isRead: false },
      { isRead: true }
    );

    successResponse(res, 'All notifications marked as read');
  } catch (error) {
    errorResponse(res, 'Server error', error.message, 500);
  }
});

/**
 * DELETE /api/notifications/:notificationId
 * Delete notification
 */
router.delete('/:notificationId', authenticateToken, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.notificationId);

    if (!notification) {
      return errorResponse(res, 'Notification not found', null, 404);
    }

    if (notification.recipient.toString() !== req.user.id) {
      return errorResponse(res, 'Not authorized', null, 403);
    }

    await Notification.findByIdAndDelete(req.params.notificationId);

    successResponse(res, 'Notification deleted');
  } catch (error) {
    errorResponse(res, 'Server error', error.message, 500);
  }
});

/**
 * DELETE /api/notifications/delete-all
 * Delete all notifications
 */
router.delete('/delete/all', authenticateToken, async (req, res) => {
  try {
    await Notification.deleteMany({ recipient: req.user.id });

    successResponse(res, 'All notifications deleted');
  } catch (error) {
    errorResponse(res, 'Server error', error.message, 500);
  }
});

module.exports = router;
