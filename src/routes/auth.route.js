import express from 'express';
import { validationHandler } from '../middlewares/handler.middleware.js';
import authRequestValidator from '../validations/auth.validation.js';
import authController from '../controllers/auth.controller.js';
const router = express.Router();

/**
 * Route: /auth/login
 * Method: POST
 * Description: Handles user authentication by validating login credentials.
 */

router
  .route('/login')
  .post(validationHandler(authRequestValidator.login), authController.login);

/**
 * Route: /auth/logout
 * Method: GET
 * Description: Logs the user out by terminating the current session.
 */

router.route('/logout').get((req, res) => res.json('logout route'));

/**
 * Route: /auth/forgot-password
 * Method: PUT
 * Description: Initiates the process for recovering a forgotten password.
 */

router
  .route('/forgot-password')
  .put((req, res) => res.json('forgot password route'));

/**
 * Route: /auth/reset-password
 * Method: PUT
 * Description: Resets the user's password after successful validation.
 */

router
  .route('/reset-password')
  .put((req, res) => res.json('reset password route'));

export default router;
