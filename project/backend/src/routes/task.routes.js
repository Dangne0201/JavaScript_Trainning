const express = require('express');
const { body, param } = require('express-validator');
const validate = require('../middlewares/validate.middleware');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/task.controller');

const router = express.Router();

const taskFields = [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('status')
    .optional()
    .isIn(['todo', 'done'])
    .withMessage('Status must be todo or done'),
];

const taskId = param('id').isMongoId().withMessage('Invalid task ID');

router.get('/', getTasks);
router.post(
  '/',
  [body('title').trim().notEmpty().withMessage('Title is required')],
  validate,
  createTask
);
router.put('/:id', [taskId, ...taskFields], validate, updateTask);
router.delete('/:id', taskId, validate, deleteTask);

module.exports = router;
