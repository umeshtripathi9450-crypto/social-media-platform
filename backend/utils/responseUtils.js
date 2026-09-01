/**
 * API response utility
 * Standardizes API responses across the application
 */

/**
 * Send success response
 */
const successResponse = (res, message, data = null, statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

/**
 * Send error response
 */
const errorResponse = (res, message, errors = null, statusCode = 400) => {
  res.status(statusCode).json({
    success: false,
    message,
    errors
  });
};

/**
 * Pagination helper
 */
const getPagination = (page = 1, limit = 10) => {
  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
  const skip = (pageNum - 1) * limitNum;

  return {
    page: pageNum,
    limit: limitNum,
    skip
  };
};

/**
 * Format pagination metadata
 */
const formatPaginationMeta = (page, limit, total) => {
  return {
    page,
    limit,
    total,
    pages: Math.ceil(total / limit),
    hasNextPage: page < Math.ceil(total / limit),
    hasPrevPage: page > 1
  };
};

module.exports = {
  successResponse,
  errorResponse,
  getPagination,
  formatPaginationMeta
};
