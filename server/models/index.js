const mongoose = require('mongoose');

mongoose.set('debug', process.env.NODE_ENV === 'development');
mongoose.Promise = global.Promise;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();

module.exports.User = require('./user');
module.exports.Poll = require('./poll');
