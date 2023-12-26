import { envConfig } from '../../../config/index.js';
import { ApplicationError, createError } from '../error/index.js';

/**
 * Formats an error for response, removing sensitive information.
 *
 * @param {Error} error - The error object.
 * @param {Object} overrides - Additional properties to override in the response.
 * @returns {Object} Formatted error response.
 */

export function formatError(error, overrides = {}) {
  const stackTrace = JSON.stringify(error, ['stack'], 4) || {};
  const newError = JSON.parse(JSON.stringify(error));

  // No need to send to client
  newError.statusCode = undefined;
  delete newError.meta;

  return {
    error: {
      ...newError,
      ...(envConfig.ENV === 'development' && {
        stack: JSON.parse(stackTrace).stack,
      }),
    },
    success: false,
    ...overrides,
  };
}

/**
 * Formats a successful response payload.
 *
 * @param {any} result - The data to be included in the response.
 * @param {Object} override - Additional properties to override in the response.
 * @returns {Object} Formatted success response.
 */

export function formatResponse(result, override = {}) {
  return {
    data: result,
    success: true,
    ...override,
  };
}

/**
 * Sends a formatted response to the client based on the payload type.
 *
 * @param {Object} res - Express response object.
 * @param {any} payload - The data or error to be sent in the response.
 * @param {number} statusCode - HTTP status code for the response.
 * @returns {Object} Express response object.
 */

export function sendResponse(res, payload, statusCode = 200) {
  if (payload instanceof ApplicationError) {
    return res.status(payload.statusCode || 500).json(formatError(payload));
  }

  if (payload instanceof Error) {
    const newError = createError(payload);
    return res.status(newError.statusCode || 500).json(formatError(newError));
  }

  return res.status(statusCode).json(formatResponse(payload));
}
