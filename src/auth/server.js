'use strict';

const express = require('express');

const router = express.Router();
const PORT = process.env.PORT || 3002;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res, next) => {
  res.status(200).send('Welcome to my API');
});

app.get('/bad', (req, res, next) => {
  next('Houseton we have a problem');
});

const startServer = () => {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
};

module.exports = { startServer, app };

