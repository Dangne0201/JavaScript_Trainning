const cron = require('node-cron');
const Task = require('../models/Task');
const { sendDeadlineReminder } = require('./sendEmail');

const runDeadlineReminders = async () => {
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const tasks = await Task.find({
    deadline: { $gt: now, $lte: tomorrow },
    status: { $ne: 'done' },
  }).populate('owner', 'email');

  for (const task of tasks) {
    if (!task.owner || !task.owner.email) {
      console.error(`Cannot send reminder for task ${task._id}: owner email missing`);
      continue;
    }

    await sendDeadlineReminder({ recipient: task.owner.email, task });
  }

  console.log(`Deadline reminder job checked ${tasks.length} task(s)`);
};

const startDeadlineReminderJob = () => {
  cron.schedule('0 8 * * *', () => {
    runDeadlineReminders().catch((error) => {
      console.error('Deadline reminder job failed:', error.message);
    });
  });

  console.log('Deadline reminder job scheduled for 08:00 daily');
};

module.exports = { startDeadlineReminderJob, runDeadlineReminders };
