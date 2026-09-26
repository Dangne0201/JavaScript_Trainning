require('dotenv').config();

const mongoose = require('mongoose');
const User = require('../src/models/User');
const Task = require('../src/models/Task');

const assignLegacyTasks = async () => {
  const username = process.argv[2]?.toLowerCase();
  if (!username) {
    throw new Error('Usage: npm run migrate:legacy-tasks -- <username>');
  }
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not configured');
  }

  await mongoose.connect(process.env.MONGODB_URI);
  const user = await User.findOne({ username });
  if (!user) throw new Error(`User "${username}" was not found`);

  const result = await Task.updateMany(
    { ownerId: { $exists: false } },
    { $set: { ownerId: user._id } },
  );
  console.log(
    `Assigned ${result.modifiedCount} legacy task(s) to ${username}.`,
  );
  await mongoose.disconnect();
};

assignLegacyTasks()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (mongoose.connection.readyState !== 0) await mongoose.disconnect();
  });
