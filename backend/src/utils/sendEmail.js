const nodemailer = require('nodemailer');

const createTransporter = () => {
  const { EMAIL_HOST, EMAIL_USER, EMAIL_PASS } = process.env;

  if (!EMAIL_HOST || !EMAIL_USER || !EMAIL_PASS) {
    throw new Error('Email service is not configured');
  }

  return nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 587),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
};

const sendDeadlineReminder = async ({ recipient, task }) => {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: recipient,
    subject: `Deadline reminder: ${task.title}`,
    text: [
      `Your task "${task.title}" is due within the next 24 hours.`,
      `Deadline: ${task.deadline.toISOString()}`,
      `Priority: ${task.priority}`,
    ].join('\n'),
  });
};

module.exports = { sendDeadlineReminder };
