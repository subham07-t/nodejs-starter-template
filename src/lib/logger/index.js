import { createLogger, transports, format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import chalk from 'chalk';
import { envConfig, logConfig } from '../../config/index.js';

/**
 * Custom log format for Winston.
 * @param {object} info - Log information.
 * @param {string} info.level - Log level.
 * @param {string} info.message - Log message.
 * @param {object} info.timestamp - Log timestamp.
 * @param {object} info.meta - Additional metadata.
 * @returns {string} - Formatted log message.
 */
const logFormat = format.printf(({ level, message, timestamp, meta }) => {
  if (meta.error) {
    const errorForLog = JSON.stringify(meta.error);
    const errorCode = JSON.parse(errorForLog).code;
    const errorMessage = JSON.parse(errorForLog).message;

    return `${timestamp} [${level}][${chalk.red(errorCode)}] : ${chalk.red(
      `${errorMessage}`
    )}`;
  }

  return `${timestamp} [${level}] : ${message}`;
});

/**
 * Winston transports for general logs.
 * @type {Array}
 */
const loggerTransports = [
  new DailyRotateFile({
    level: envConfig.ENV !== 'production' ? 'debug' : 'error',
    filename: `${logConfig.LOGS_DIR}/${
      envConfig.ENV !== 'production' ? 'debug' : 'error'
    }/${envConfig.ENV !== 'production' ? 'debug' : 'error'}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    maxSize: '10m',
    maxFiles: '5d',
  }),
];

/**
 * Winston transports for request-specific logs.
 * @type {Array}
 */
const loggerRequestTransports = [
  new DailyRotateFile({
    level: 'warn',
    filename: `${logConfig.LOGS_DIR}/warn/warn-%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    maxSize: '10m',
    maxFiles: '5d',
  }),
  new DailyRotateFile({
    level: 'error',
    filename: `${logConfig.LOGS_DIR}/error/error-%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    maxSize: '10m',
    maxFiles: '5d',
  }),
];

// Add Console transports for non-production environments
if (envConfig.ENV !== 'production') {
  loggerTransports.push(
    new transports.Console({
      format: format.combine(
        format.colorize({ all: true }),
        format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        logFormat
      ),
    })
  );

  loggerRequestTransports.push(
    new transports.Console({
      format: format.combine(
        format.colorize({ all: true }),
        format.timestamp({ format: logConfig.DATE_FORMAT }),
        logFormat
      ),
    }),
    new DailyRotateFile({
      level: 'info',
      filename: `${logConfig.LOGS_DIR}/info/info-%DATE%.log`,
      datePattern: 'YYYY-MM-DD-HH',
      maxSize: '10m',
      maxFiles: '5d',
    })
  );
}

/**
 * Logger instance for general logs.
 * @type {object}
 */
const logger = createLogger({
  transports: loggerTransports,
  format: format.combine(
    format.timestamp({ format: logConfig.DATE_FORMAT }),
    format.json(),
    format.prettyPrint()
  ),
});

/**
 * Logger instance for request-specific logs.
 * @type {object}
 */
const requestLogger = createLogger({
  transports: loggerRequestTransports,
  format: format.combine(
    format.timestamp({ format: logConfig.DATE_FORMAT }),
    format.json(),
    format.prettyPrint()
  ),
});

// logger.transports[0].on('rotate', function (oldFilename, newFilename) {
//   // call function like upload to s3 or on cloud
// });
// requestLogger.transports[0].on('rotate', function (oldFilename, newFilename) {
//   // call function like upload to s3 or on cloud
// });
// requestLogger.transports[1].on('rotate', function (oldFilename, newFilename) {
//   // call function like upload to s3 or on cloud
// });

export { logger, requestLogger };
