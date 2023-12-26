import { body } from 'express-validator';

const login = [
  body('email', 'Invalid does not Empty').not().isEmpty(),
  body('email', 'Invalid email').isEmail(),
  body('password', 'The minimum password length is 6 characters').isLength({
    min: 6,
  }),
];

export default { login };
