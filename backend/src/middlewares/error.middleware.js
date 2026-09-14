const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'MulterError') {
    const message =
      err.code === 'LIMIT_FILE_SIZE'
        ? 'Avatar must be 2MB or smaller'
        : 'Avatar must be a JPG, PNG, or WEBP image';

    return res.status(400).json({ success: false, message });
  }

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

  return res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
};

module.exports = { notFound, errorHandler };
