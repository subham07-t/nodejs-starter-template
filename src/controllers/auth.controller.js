import { sendResponse } from '../lib/api/index.js';
import { asyncHandler } from '../middlewares/handler.middleware.js';

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  sendResponse(res, { email, password });
});

export default { login };
