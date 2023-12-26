/**
 * @typedef {Object} ErrorObject
 * @property {string} code - Error code.
 * @property {string} message - Error message.
 * @property {number} statusCode - HTTP status code.
 * @property {Object} [errors] - Additional errors
 * @property {Object} [meta] - Additional metadata.
 */

/**
 * @typedef {Object.<string, ErrorObject>} CustomError
 */

/**
 * Custom error objects for standardized error handling.
 * @type {CustomError}
 */

const CustomError = {
  UNKNOWN_ERROR: {
    code: 'UNKNOWN_ERROR',
    message: 'Unknown error',
    statusCode: 500,
  },
  VALIDATION_ERROR: {
    code: 'VALIDATION_ERROR',
    message: 'Validation failed',
    statusCode: 400,
  },
  DATABASE_ERROR: {
    code: 'DATABASE_ERROR',
    message: 'Database error',
    statusCode: 500,
  },
  NOT_FOUND_ERROR: {
    code: 'RESOURCE_NOT_FOUND',
    message: 'Resource not found',
    statusCode: 404,
    meta: {
      translationKey: 'app.common.error.RESOURCE_NOT_FOUND',
    },
  },
  INTERNAL_SERVER_ERROR: {
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Something went wrong, Please try again later.',
    statusCode: 500,
    meta: {
      shouldRedirect: true,
    },
  },
};

export { CustomError };
