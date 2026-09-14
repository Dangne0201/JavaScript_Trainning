const multer = require('multer');

const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return callback(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'avatar'));
    }

    callback(null, true);
  },
});

module.exports = upload;
