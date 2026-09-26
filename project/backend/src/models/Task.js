const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      select: false,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [1, 'Title cannot be empty'],
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    status: {
      type: String,
      enum: ['backlog', 'todo', 'in_progress', 'done'],
      default: 'todo',
      index: true,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
      index: true,
    },
    dueDate: {
      type: Date,
      default: null,
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: (tags) =>
          tags.length <= 10 &&
          tags.every((tag) => tag.length > 0 && tag.length <= 30),
        message:
          'Tasks can have up to 10 tags, each between 1 and 30 characters',
      },
    },
  },
  { timestamps: true },
);

taskSchema.index({ ownerId: 1, createdAt: -1 });

module.exports = mongoose.model('Task', taskSchema);
