'use strict';

const supertest = require('supertest');
const server = require('../server');
const request = supertest(server.app);

describe('bearer auth middleware', () => {

  it('should check if the user is logged in', async () => {
    const response = await request.get('/user');
    expect(response.status).toEqual(500);
  }
  );






});