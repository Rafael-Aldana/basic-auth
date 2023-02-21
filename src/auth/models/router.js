'use strict';

const express = require('express');
const { userModel } = require('./index');
const bcrypt = require('bcrypt');
const basicAuth = require('../middleware/basic');


const router = express.Router();

router.post('/signup', async (req, res, next) => {

  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await userModel.create(req.body);
    res.status(200).json(record);

  } catch (error) {
    res.status(403).send('Error Creating User');
  }
});


router.post('/signin', basicAuth, async (req, res, next) => {
  res.status(200).send(req.user);
});

module.exports = router;
