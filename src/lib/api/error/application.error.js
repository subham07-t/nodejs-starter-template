/**
 * Custom error class representing application-specific errors.
 *
 * @class ApplicationError
 * @extends {Error}
 */

export class ApplicationError extends Error {
  /**
   * Creates an instance of ApplicationError.
   *
   * @param {Object} options - Configuration options for the error.
   * @param {string} options.code - Error code.
   * @param {string} options.message - Error message.
   * @param {number} [options.statusCode] - HTTP status code.
   * @param {Array} [options.errors] - Additional error details or nested errors.
   * @param {Object} [options.meta] - Additional metadata.
   * @param {Object} [overrides] - Optional overrides for the error properties.
   * @throws {Error} Throws an error if 'message' or 'code' is missing in options.
   */

  constructor(options, overrides) {
    super();
    Object.assign(options, overrides);

    if (!options.message) {
      throw new Error('ApplicationError: error message required.');
    }

    if (!options.code) {
      throw new Error('ApplicationError: error code required.');
    }

    this.name = 'ApplicationError';
    this.code = options.code;
    this.message = options.message;
    this.statusCode = options.statusCode;
    this.errors = options.errors;
    this.meta = options.meta;
  }
}
