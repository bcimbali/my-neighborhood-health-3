const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  passwordConf: {
    type: String,
    required: false
  },
  terms: {
    type: Boolean,
    required: false
  }
});

// authenticate input against database
UserSchema.statics.authenticate = function(username, password, callback) {
  console.log('Inside UserSchema Authentication');
  User.findOne({ username }).exec(function(err, user) {
    if (err) {
      return callback(err);
    }
    if (!user) {
      var err = new Error('User not found.');
      err.status = 401;
      console.log('User Not Found');
      return callback(err);
    }
    bcrypt.compare(password, user.password, function(err, result) {
      if (result === true) {
        console.log('User was found');
        return callback(null, user);
      }
      return callback();
    });
  });
};

// hashing a password before saving it to the database
UserSchema.pre('save', function(next) {
  const user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
