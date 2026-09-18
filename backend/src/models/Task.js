const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [1, 'Title cannot be empty'],
    },
    status: {
      type: String,
      enum: ['todo', 'done'],
      default: 'todo',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
