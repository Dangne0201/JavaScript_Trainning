const express = require('express');
const { body, param, query } = require('express-validator');
const validate = require('../middlewares/validate.middleware');
const protect = require('../middlewares/auth.middleware');
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/task.controller');

const router = express.Router();

router.use(protect);

const taskFields = [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('deadline').optional().isISO8601().withMessage('Deadline must be a valid date'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high'),
  body('status')
    .optional()
    .isIn(['todo', 'in-progress', 'done'])
    .withMessage('Status must be todo, in-progress, or done'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array of strings')
    .custom((tags) => tags.every((tag) => typeof tag === 'string'))
    .withMessage('Tags must be an array of strings'),
];

const taskId = param('id').isMongoId().withMessage('Invalid task ID');

router.get(
  '/',
  [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be at least 1'),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('Limit must be between 1 and 100'),
    query('status')
      .optional()
      .isIn(['todo', 'in-progress', 'done'])
      .withMessage('Status must be todo, in-progress, or done'),
    query('priority')
      .optional()
      .isIn(['low', 'medium', 'high'])
      .withMessage('Priority must be low, medium, or high'),
  ],
  validate,
  getTasks
);
router.post(
  '/',
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('deadline').isISO8601().withMessage('Deadline must be a valid date'),
    ...taskFields.slice(2),
  ],
  validate,
  createTask
);
router.get('/:id', taskId, validate, getTaskById);
router.put('/:id', [taskId, ...taskFields], validate, updateTask);
router.delete('/:id', taskId, validate, deleteTask);

module.exports = router;
