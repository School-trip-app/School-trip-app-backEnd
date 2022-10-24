'use strict';

const supertest = require('supertest');
const server = require('../server');
const request = supertest(server.app);

describe('500 error handler', () => {
  
    it('should respond with a 500 on an error', async () => {
      const response = await request.get('/bad');
      expect(response.status).toEqual(500);
    }
    );

} );