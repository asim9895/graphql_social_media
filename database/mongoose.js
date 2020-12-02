const mongoose = require('mongoose');
const config = require('config');
const mongodbURL = config.get('mongodbURL');

const connectdb = async () => {
  try {
    await mongoose.connect(mongodbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });
    console.log('mongodb connected');
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectdb;
