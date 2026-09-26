const Task = require('../models/Task');
const AppError = require('../utils/AppError');

const SORT_FIELDS = {
  createdAt: 'createdAt',
  dueDate: 'dueDate',
  title: 'title',
  priority: 'priority',
};

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const listTasks = async (ownerId, query) => {
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 10);
  const filter = { ownerId };

  if (query.status) filter.status = query.status;
  if (query.priority) filter.priority = query.priority;
  if (query.tag) filter.tags = query.tag.toLowerCase();
  if (query.q)
    filter.title = { $regex: escapeRegex(query.q.trim()), $options: 'i' };

  const sortField = SORT_FIELDS[query.sortBy] || 'createdAt';
  const sortDirection = query.order === 'asc' ? 1 : -1;
  const [tasks, total] = await Promise.all([
    Task.find(filter)
      .sort({ [sortField]: sortDirection, _id: sortDirection })
      .skip((page - 1) * limit)
      .limit(limit),
    Task.countDocuments(filter),
  ]);

  return {
    data: tasks,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const normalizeFields = (fields) => ({
  ...fields,
  ...(fields.tags ? { tags: fields.tags.map((tag) => tag.toLowerCase()) } : {}),
});

const createTask = async (ownerId, fields) =>
  Task.create({ ...normalizeFields(fields), ownerId });

const updateTask = async (ownerId, taskId, fields) => {
  const task = await Task.findOneAndUpdate(
    { _id: taskId, ownerId },
    { $set: normalizeFields(fields) },
    { new: true, runValidators: true },
  );

  if (!task) throw new AppError('Task not found', 404);
  return task;
};

const deleteTask = async (ownerId, taskId) => {
  const task = await Task.findOneAndDelete({ _id: taskId, ownerId });
  if (!task) throw new AppError('Task not found', 404);
};

module.exports = { listTasks, createTask, updateTask, deleteTask };
