'use strict';

const supertest = require('supertest');
const server = require('../server');
const request = supertest(server.app);

describe('comment Route', () => {

  it('should create a new memory', async () => {
    const response = await request.post('/comment/1/1').send({
      userId: 1,
      memoryId: 1,
      comment: 'how was your trip'
    });
    
    console.log(response.body);
    expect(response.status).toEqual(201);
    expect(response.body.comment).toEqual('how was your trip');
  });


  it('should get all comments', async () => {
    const response = await request.post('/comment/1/1').send({
      userId: 1,
      memoryId: 1,
      comment: 'how was your trip'
    });

    const response2 = await request.get('/comment/1');
    expect(response2.status).toEqual(200);
    expect(response2.body[0].comment).toEqual('how was your trip');
    console.log(response2.body);
  });

  // it('should update the comment', async () => {
  //   const response = await request.post('/comment/1/1').send({
  //     userId: 1,
  //     memoryId: 1,
  //     comment: 'how was your trip'
  //   });

  //   const response2 = await request.put('/comment/1').send({
  //     comment: 'how was your trip'
  //   });
  //   expect(response2.status).toEqual(200);
  //   expect(response2.body[2].comment).toEqual('how was your trip');
  // });
  
}
);