const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) throw new AppError('Authentication required', 401);

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub).select('+tokenVersion');
    if (!user || payload.ver !== user.tokenVersion) {
      throw new AppError('Authentication required', 401);
    }

    req.user = { id: user.id, username: user.username };
    next();
  } catch (error) {
    if (error instanceof AppError) return next(error);
    if (
      error.name === 'JsonWebTokenError' ||
      error.name === 'TokenExpiredError'
    ) {
      return next(new AppError('Authentication required', 401));
    }
    return next(error);
  }
};

module.exports = authenticate;
