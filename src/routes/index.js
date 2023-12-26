import express from 'express';
import { envConfig } from '../config/index.js';
import auth from './auth.route.js';

const router = express.Router();

/**
 * server status route
 * Verifies server status and route functionality.
 */
router.get('/status', (__, res) => {
  res.send(
    `server is running on : ${envConfig.PORT} \n mode: ${envConfig.ENV}`
  );
});

/**
 * Main routes for the app
 * These routes are responsible for handling different features of the application.
 */

router.use('/auth', auth);


export default router;
