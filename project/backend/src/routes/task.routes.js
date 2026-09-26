const express = require('express');
const { body, param, query } = require('express-validator');
const validate = require('../middlewares/validate.middleware');
const authenticate = require('../middlewares/auth.middleware');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/task.controller');

const router = express.Router();

const allowedFields = ['title', 'status', 'priority', 'dueDate', 'tags'];
const taskFields = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  body('status')
    .optional()
    .isIn(['backlog', 'todo', 'in_progress', 'done'])
    .withMessage('Status must be backlog, todo, in_progress, or done'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high'),
  body('dueDate')
    .optional({ nullable: true })
    .isISO8601()
    .withMessage('Due date must be a valid ISO 8601 date'),
  body('tags')
    .optional()
    .isArray({ max: 10 })
    .withMessage('Tags must be an array of up to 10 values'),
  body('tags.*')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage('Each tag must be between 1 and 30 characters'),
];

const paginationFields = [
  query('page')
    .optional()
    .isInt({ min: 1, max: 10000 })
    .withMessage('Page must be between 1 and 10000'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('status')
    .optional()
    .isIn(['backlog', 'todo', 'in_progress', 'done'])
    .withMessage('Invalid status filter'),
  query('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Invalid priority filter'),
  query('tag').optional().trim().isLength({ min: 1, max: 30 }),
  query('q')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Search is too long'),
  query('sortBy')
    .optional()
    .isIn(['createdAt', 'dueDate', 'title', 'priority'])
    .withMessage('Invalid sort field'),
  query('order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Order must be asc or desc'),
];

const taskId = param('id').isMongoId().withMessage('Invalid task ID');
const updateBody = body().custom((value) => {
  if (
    !value ||
    typeof value !== 'object' ||
    Array.isArray(value) ||
    Object.keys(value).length === 0 ||
    Object.keys(value).some((field) => !allowedFields.includes(field))
  ) {
    throw new Error('Provide at least one supported task field');
  }
  return true;
});

router.use(authenticate);
router.get('/', paginationFields, validate, getTasks);
router.post(
  '/',
  body().custom((value) => {
    if (
      !value ||
      typeof value !== 'object' ||
      Array.isArray(value) ||
      Object.keys(value).some((field) => !allowedFields.includes(field))
    ) {
      throw new Error('Only supported task fields can be provided');
    }
    return true;
  }),
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  taskFields.slice(1),
  validate,
  createTask,
);
router.patch('/:id', [taskId, updateBody, ...taskFields], validate, updateTask);
router.put('/:id', [taskId, updateBody, ...taskFields], validate, updateTask);
router.delete('/:id', taskId, validate, deleteTask);

module.exports = router;
