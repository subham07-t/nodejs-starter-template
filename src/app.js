// Importing necessary modules and libraries for the Express server.
import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import expressWinston from 'express-winston';

// Importing custom modules and configurations.
import routes from './routes/index.js';
import { errorHandler } from './middlewares/handler.middleware.js';
import { CustomError, createError } from './lib/api/index.js';
import { logger, requestLogger } from './lib/logger/index.js';
import { envConfig } from './config/index.js';

// Create Express server
const app = express();

// Express configuration
app.set('port', envConfig.PORT);
app.set('env', envConfig.ENV);

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(cors());

app.use(
  expressWinston.logger({
    winstonInstance: requestLogger,
    statusLevels: true,
  })
);

expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');

/**
 * Primary app routes initialized.
 */
app.use('/api/v1', routes);
app.all('*', (req, __, next) => {
  next(
    createError(CustomError.NOT_FOUND_ERROR, {
      message: `Not found: ${req.originalUrl}`,
    })
  );
});

/**
 * Global error handler initialized
 */
app.use(
  expressWinston.errorLogger({
    winstonInstance: logger,
  })
);
app.use(errorHandler);

export default app;
