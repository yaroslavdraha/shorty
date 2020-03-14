const express = require('express');
const config = require('config');
const connectDB = require('./providers/database')();

const app = express();

// Define middleware
app.use(express.json({extended: false}));

// Define Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

function createServer() {
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


