const mongoose = require("mongoose");
const moment = require("moment");
// We add validation here, but also add validation on the routes
const validator = require("validator");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not an email"
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      },
      exp: {
        type: Number,
        required: true
      }
    }
  ],
  resetToken: String,
  resetTokenExpiration: Date
});

UserSchema.pre("save", function(next) {
  const user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(12, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.methods.getAuthToken = function() {
  const user = this;
  const access = "auth";

  // Generate a json web token
  const userId = user._id.toHexString();
  const exp = Math.floor(Date.now() / 1000) + 60 * 60; // 1 hour
  const token = jwt
    .sign({ _id: userId, access }, process.env.JWT_SECRET, {
      expiresIn: "3600000"
    })
    .toString();
  user.tokens.push({
    access,
    token,
    exp
  });

  return user.save().then(() => {
    return token;
  });
};

UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    console.log(e);
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    "tokens.token": token,
    "tokens.access": "auth"
  });
};

UserSchema.methods.removeToken = function(token) {
  var user = this;

  return user.update({
    $pull: {
      tokens: { token }
    }
  });
};

UserSchema.methods.removeExpTokens = function() {
  var user = this;
  // user.update({ dates: { $not: { $lt: new Date() } } });
  const activeTokens = [];
  user.tokens.forEach(token => {
    if (new Date(token.exp * 1000) > Date.now()) {
      activeTokens.push(token);
    }
  });
  user.tokens = activeTokens;
  return user.update({
    $set: {
      tokens: activeTokens
    }
  });
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
