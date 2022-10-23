'use strict';

const supertest = require('supertest');
const server = require('../server');
const request = supertest(server.app);



describe('Sample Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true)
  })
})