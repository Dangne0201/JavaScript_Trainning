const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: Object.values(err.errors).map((error) => error.message),
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid resource ID',
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: 'A resource with that value already exists',
    });
  }

  if (err.type === 'entity.too.large') {
    return res
      .status(413)
      .json({ success: false, message: 'Request body is too large' });
  }

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid JSON request body' });
  }

  const statusCode = err.statusCode || err.status || 500;
  if (statusCode >= 500) console.error(err);

  return res.status(statusCode).json({
    success: false,
    message: statusCode >= 500 ? 'Internal server error' : err.message,
  });
};

module.exports = { notFound, errorHandler };
