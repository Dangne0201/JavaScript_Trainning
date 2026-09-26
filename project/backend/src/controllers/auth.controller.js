const authService = require('../services/auth.service');

const cookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

const setAuthCookie = (res, token) =>
  res.cookie('token', token, cookieOptions());

const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    setAuthCookie(res, result.token);
    res.status(201).json({ success: true, data: result.user });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    setAuthCookie(res, result.token);
    res.json({ success: true, data: result.user });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await authService.logout(req.user.id);
    const { httpOnly, secure, sameSite } = cookieOptions();
    res.clearCookie('token', { httpOnly, secure, sameSite });
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

const currentUser = (req, res) => {
  res.json({ success: true, data: req.user });
};

module.exports = { register, login, logout, currentUser };
