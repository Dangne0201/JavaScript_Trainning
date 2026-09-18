require('dotenv').config();

const app = require('./app');
const connectDatabase = require('./config/db');

const port = process.env.PORT || 5000;

const startServer = async () => {
  await connectDatabase();
  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use. Stop the other server and try again.`);
      process.exit(1);
    }

    throw error;
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error.message);
  process.exit(1);
});
