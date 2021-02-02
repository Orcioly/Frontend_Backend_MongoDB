const mongoose = require("mongoose");

mongoose.connect(process.env.BASE_URL, {
  // useMongoClient: true
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.Promise = global.Promise;

module.exports = mongoose;
