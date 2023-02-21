'use strict';

// 3rd party requirements

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const base64 = require('base-64');
const bcrypt = require('bcryptjs');
const { Sequelize, DataTypes } = require('sequelize');
const { request } = require('express');

// port to server
const PORT = process.env.PORT || 3002;

const app = express();
app.use(express.json());

// database URL set up (test or dev)
const DATABASE_URL = process.env.NODE_ENV === 'test'? 'sqlite:memory' : process.env.DATABASE_URL;

const sequelizeDatabase = new Sequelize(DATABASE_URL)

// allows us to accept webform data, aka proces FORM input and add to request body

app.use(express.urlencoded({ extended: true }));

// create user model
const userModel = sequelizeDatabase.define('user', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// sequelize allows us to interact with the usermodel before adding data to the database using the beforeCreate hook
userModel.beforeCreate((user) => {
  console.log('our user', user);
});

const basicAuth = async (req, res, next) => {
  // console.log(req);
  let { authourization } = req.headers;
console.log('auth string', authourization);
//  basic
// 1. isolate the encoded part of the string
let authString = authourization.split(' ')[1];
console.log('auth string', authString);

// 2. I need to decode the isolated string
let decodedAuthString = base64.decode(authString);
console.log('decoded auth string', decodedAuthString);

// 3. I need to isolate the pass FROM the decoded string
// username:password
// array destructuring
let { username, password } = decodedAuthString.split(':');
console.log('username:', username, 'password', password);

let user = await userModel.findOne({ where: { username: username } });
if(user) {
  let validUser = await bcrypt.compare(password, user.password);
  if(validUser) {
  req.user = user;
  next();
  } else {
    next('Not Authorized if password is incorrect')
  } else {
    next('Not Authorized if user does not exist');
  }
}
  // request.user = 'still working';
  // next();
};


app.post('/signup', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 5);

    let newUser = await userModel.create({
      username,
      password: encryptedPassword,
    });
    res.status(201).send(newUser);
  } catch (error) {
    next('signup error occured');
  }
});

app.post('/signin', basicAuth, async (req, res, next) => {
  res.status(200).send(req.user);
});


sequelizeDatabase.sync()
.then(() => {
console.log('successful connection to database');
app.listen(PORT, () => console.log(`listening on port `, PORT));
})
.catch(error => console.warn);
