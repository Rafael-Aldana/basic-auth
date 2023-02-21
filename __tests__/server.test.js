'use strict';

const supertest = require ('supertest');
const { app } = require ('../src/auth/server');
const request = supertest (app);

describe('AuthLogin', () => {
  it('should create a new user', async () => {
    const response = await request.post('/signup').send ({
      username: 'Rafael',
      password: 'pass123'
    });
    expect(response.username).toBe('Rafael');
    console.log(response);
  })
})
