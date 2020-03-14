const mongoose = require('mongoose');
const config = require('config');

const connectionURI = config.get('mongo.uri');

const connect = async () => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 3000
  };

  try {
    await mongoose.connect(connectionURI, options)
  } catch(err) {
    console.log(`DB Connection error: ${err.message}`);
    process.exit(1)
  }

  console.log('DB Connected')
};

mongoose.connection.on('error', err => {
  console.log(`DB Error: ${err.message}`)
});

module.exports = connect;
