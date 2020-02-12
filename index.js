const express = require('express');
const config = require('config');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Define middleware
app.use(express.json({extended: false}));

// Define Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

function createServer() {
  // const PORT = config.get('app.port');
  const PORT = process.env.PORT || 3000;

  const httServer = app.listen(PORT, () =>
    console.log(`Server is running on port ${PORT}`)
  );

  return httServer;
}

if (require.main === module) {
  createServer();
}

module.exports = createServer;


