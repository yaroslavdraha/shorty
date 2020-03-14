const app = require('./server');
const config = require('config');
const connection = require('./providers/database')();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);

module.exports = app;


