const User = require('../models/User');
const configureCloudinary = require('../config/cloudinary');

const getMe = (req, res) => {
  res.json({ success: true, data: req.user });
};

const uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'An avatar image is required',
      });
    }

    const cloudinary = configureCloudinary();
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'personal-task-manager/avatars',
          resource_type: 'image',
        },
        (error, uploadResult) => {
          if (error) {
            reject(error);
          } else {
            resolve(uploadResult);
          }
        }
      );

      stream.end(req.file.buffer);
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatarUrl: result.secure_url },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMe, uploadAvatar };
