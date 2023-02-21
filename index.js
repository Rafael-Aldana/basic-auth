'use strict';

const { startServer } = require('../src/server');

const { sequelizeDatabase } = require('../src/models/index');

sequelizeDatabase.sync()
  .then(() => {
    console.log('Database is synced');
    startServer();
  })
  .catch((error) => console.error(error));
