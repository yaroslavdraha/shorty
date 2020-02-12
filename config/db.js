const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongo.uri');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  } catch (err) {
    console.log(`DB Connection error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

