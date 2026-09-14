const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [1, 'Title cannot be empty'],
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    deadline: {
      type: Date,
      required: [true, 'Deadline is required'],
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    status: {
      type: String,
      enum: ['todo', 'in-progress', 'done'],
      default: 'todo',
    },
    tags: {
      type: [String],
      default: [],
    },
    // Optional until authentication is added in the next step.
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Task owner is required'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
