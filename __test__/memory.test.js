'use strict';

const supertest = require('supertest');
const server = require('../server');
const request = supertest(server.app);

describe('memory Route', () => {

  it('should create a new memory', async () => {
    const response = await request.post('/memory/2').send({
      imageUrl: 'https://cdn.vox-cdn.com/uploads/chorus_asset/file/23003580/IMG_4610.jpg',
      discription: 'we are enjoying our trip',
      likes: 1,
      dislikes: 4
    });

    console.log(response.body);
    expect(response.status).toEqual(201);
    expect(response.body.imageUrl).toEqual('https://cdn.vox-cdn.com/uploads/chorus_asset/file/23003580/IMG_4610.jpg');
    expect(response.body.discription).toEqual('we are enjoying our trip');
    expect(response.body.likes).toEqual(1);
    expect(response.body.dislikes).toEqual(4);
  });


  it('should get all memories', async () => {
    const response = await request.post('/memory/2').send({
      userId: 1,
      imageUrl: 'https://cdn.vox-cdn.com/uploads/chorus_asset/file/23003580/IMG_4610.jpg',
      discription: 'we are enjoying our trip',
      likes: 1,
      dislikes: 4
    });

    const response2 = await request.get('/memory');
    expect(response2.status).toEqual(200);
    expect(response2.body[3].imageUrl).toEqual('https://cdn.vox-cdn.com/uploads/chorus_asset/file/23003580/IMG_4610.jpg');
    expect(response2.body[3].discription).toEqual('we are enjoying our trip');
    expect(response2.body[3].likes).toEqual(1);
    expect(response2.body[3].dislikes).toEqual(4);
    console.log(response2.body);
  });

  // it('should update the memories', async () => {
  //   const response = await request.post('/memory/2').send({
  //     userId: 2,
  //     imageUrl: 'https://cdn.vox-cdn.com/uploads/chorus_asset/file/23003580/IMG_4610.jpg',
  //     discription: 'hi',
  //     likes: 1,
  //     dislikes: 4
  //   });

  //   const response2 = await request.put('/memory/2').send({
  //     userId: 2,
  //     imageUrl: 'https://cdn.vox-cdn.com/uploads/chorus_asset/file/23003580/IMG_4610.jpg',
  //     discription: 'bye',
  //     likes: 1,
  //     dislikes: 4
  //   });
  //   expect(response2.status).toEqual(200);
  //   expect(response2.body[3].discription).toEqual('bye');
  // });

}
);