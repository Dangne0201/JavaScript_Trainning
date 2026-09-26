const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');

const issueToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }

  return jwt.sign(
    { sub: user.id, ver: user.tokenVersion },
    process.env.JWT_SECRET,
    { expiresIn: '7d' },
  );
};

const publicUser = (user) => ({ id: user.id, username: user.username });

const register = async ({ username, password }) => {
  const normalizedUsername = username.toLowerCase();
  const exists = await User.exists({ username: normalizedUsername });
  if (exists) {
    throw new AppError('Username is already taken', 409);
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({
    username: normalizedUsername,
    passwordHash,
  });
  return { user: publicUser(user), token: issueToken(user) };
};

const login = async ({ username, password }) => {
  const user = await User.findOne({ username: username.toLowerCase() }).select(
    '+passwordHash +tokenVersion',
  );

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    throw new AppError('Invalid username or password', 401);
  }

  return { user: publicUser(user), token: issueToken(user) };
};

const logout = async (userId) =>
  User.updateOne({ _id: userId }, { $inc: { tokenVersion: 1 } });

module.exports = { register, login, logout, publicUser };
