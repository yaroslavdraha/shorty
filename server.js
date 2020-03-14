const express = require('express');

const app = express();

// Define middleware
app.use(express.json({extended: false}));

// Define Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

module.exports = app;


