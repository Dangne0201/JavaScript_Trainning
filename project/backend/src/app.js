const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const path = require('path');
const taskRoutes = require('./routes/task.routes');
const authRoutes = require('./routes/auth.routes');
const { notFound, errorHandler } = require('./middlewares/error.middleware');

const createApp = ({ authRateLimit = 10 } = {}) => {
  const app = express();
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 120,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    handler: (req, res) =>
      res.status(429).json({
        success: false,
        message: 'Too many requests. Try again later.',
      }),
  });

  app.use(helmet());
  app.use(express.json({ limit: '10kb' }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '../../frontend')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/index.html'));
  });

  app.get('/api/health', (req, res) => {
    res.json({ success: true, message: 'API is running' });
  });

  app.use('/api', apiLimiter);
  app.use('/api/auth', authRoutes({ rateLimit: authRateLimit }));
  app.use('/api/tasks', taskRoutes);

  app.use(notFound);
  app.use(errorHandler);
  return app;
};

const app = createApp();

module.exports = app;
module.exports.createApp = createApp;
