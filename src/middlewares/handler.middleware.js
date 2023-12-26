import { validationResult } from 'express-validator';
import { sendResponse, createError, CustomError } from '../lib/api/index.js';

/**
 * Handles request validation based on provided validations.
 *
 * @param {Array} validations - An array of validations using express-validator.
 * @returns {Function} Middleware function to be used in Express routes for request validation.
 */

export const validationHandler = (validations) => {
  return async (req, __, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      delete errors.array()[0].value;
      return next(
        createError(CustomError.VALIDATION_ERROR, {
          errors: errors.array()[0],
        })
      );
    }

    next();
  };
};

/**
 * Handles asynchronous errors in route handlers.
 *
 * @param {Function} fn - Async function representing an Express route handler.
 * @returns {Function} Express middleware function.
 */

export const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((error) => next(error));
  };
};

/**
 * Handles synchronous errors in route handlers using try-catch.
 *
 * @param {Function} fn - Synchronous function representing an Express route handler.
 * @returns {Function} Express middleware function.
 */

export const tryCatchHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res);
  } catch (error) {
    return next(error);
  }
};

/**
 * Global error handler function for sending standardized responses.
 *
 * @param {Error} error - The error object.
 * @param {Object} _ - Express request object (not used in this middleware).
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void}
 */

export const errorHandler = (error, _, res, next) => {
  if (error) return sendResponse(res, error);

  next();
};
