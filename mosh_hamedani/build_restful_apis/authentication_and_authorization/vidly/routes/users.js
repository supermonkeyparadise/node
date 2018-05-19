const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
// const jwt = require('jsonwebtoken');
// const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');

const { User, validate } = require('../models/user');
const router = express.Router();

// 取得現在的 user
// req.user._id 由 middleware 提供
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

// 註冊
router.post('/', async (req, res) => {
  console.log('## data:', req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  // user = new User({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password
  // });
  user = new User(_.pick(req.body, ['name', 'email', 'password']));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  // 客製化 header 都應該加 x-
  res
    .header('x-auth-token', token)
    .send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;
