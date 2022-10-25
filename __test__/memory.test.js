'use strict';

const supertest = require('supertest');
const server = require('../server');
const request = supertest(server.app);

describe('memory Route', () => {

  // it('should create a new memory', async () => {

  //   const respons = await request.post('/user').send({
  //     username: 'test2',
  //     email: 'test12@test.com',
  //     password: '123',
  //     userRole: 'admin',
  //     phonenumber: '123456789',
  //     gender: 'male',
  //   });
  //   console.log(">>>>>>>>>>>>>>>>>>>>>",respons.body.id)
  //   const response = await request.post('/memory').send({
  //     discription: 'we are enjoying our trip',
  //     userId:4,
  //     likes: 1,
  //     dislikes: 4
  //   });

  //   expect(response.status).toEqual(201);
  //   expect(response.body.discription).toEqual('we are enjoying our trip');
  //   expect(response.body.likes).toEqual(1);
  //   expect(response.body.dislikes).toEqual(4);
  // });


  it('should get all memories', async () => {
    

    const response2 = await request.get('/memory');
    expect(response2.status).toEqual(200);
  });

    it('should delete a memory', async () => {
      const response = await request.delete('/memory/2');
      expect(response.status).toEqual(202);
      expect(response.send).toEqual();
  });

  // it('should update the rate of a photographer', async () => {
  //   const response = await request.post('/photographer').send({
  //       image: 'https://photographer1.jpg',
  //       name: 'Ahmad',
  //       email: 'test@test.com',
  //       phoneNumber: '123456789',
  //       rate: 5,
  //       totalRate: 5,
  //       price: 100,
  //   });
  //   response.body.id
  //   const response2 = await request.put(`/photographer/${response.body.id}`).send({
  //       rateInput: 3,
  //   });
  //   expect(response2.status).toEqual(200);
  //   expect(response2.body.rate).toEqual(4);
  //   expect(response2.body.totalRate).toEqual(8);
  // });

}
);