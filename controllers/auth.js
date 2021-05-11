const User = require('../models/user');
const HttpError = require('../models/http-error');

const asyncHandler = require('../utils/async-handler');

const bcrypt = require('bcryptjs');
const { sendTokenResponse } = require('./utils');

exports.signUp = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  // See if user exists
  let user = await User.findOne({ username });

  if (user) {
    return next(new HttpError('User with that username has already existed.', 400));
  }

  user = new User(username, password);

  // Encrypt password
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(password, salt);

  await user.save();

  res.json({ type: 'success', message: 'Register is success' });
});

exports.signIn = asyncHandler(async (req, res, next) => {
  let { username, password } = req.body;

  // bustle
  password = JSON.parse(password);

  const user = await User.findOne({ username, password });

  if (!user) return next(new HttpError('Invalid Username or Password.', 404));

  return sendTokenResponse(user, res);
});
