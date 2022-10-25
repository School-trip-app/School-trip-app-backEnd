'use strict';

const supertest = require('supertest');
const server = require('../server');
const request = supertest(server.app);



describe('404 error handler', () => {
    it('should respond with a 404 on an invalid route', async () => {
        const response = await request.get('/');
        expect(response.status).toEqual(404);



    });
});