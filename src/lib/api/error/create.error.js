import { ApplicationError } from './application.error.js';

/**
 * Creates an instance of ApplicationError with optional overrides.
 *
 * @param {string|Error} error - The error message or an Error object.
 * @param {Object} [overrides] - Optional overrides for the error properties.
 * @returns {ApplicationError} An instance of ApplicationError.
 */

export function createError(error, overrides) {
  return new ApplicationError(error, overrides);
}
