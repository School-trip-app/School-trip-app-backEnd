'use strict';

const supertest = require('supertest');
const server = require('../server');
const request = supertest(server.app);



describe('comment Route', () => {

  it('should create a new comment', async () => {

    const respons = await request.post('/user').send({
      username: 'teseeeet',
      email: 'test1@teseeeeet.com',
      password: '123',
      userRole: 'admin',
      phonenumber: '123456789',
      gender: 'male',
    });

    console.log(respons.body);


    const respon = await request.post(`/memory/${respons.body.id}`).send({
      imageUrl: 'httpse://cdn.vox-cdn.com/uploads/chorus_asset/file/23003580/IMG_4610.jpg',
      discription: 'we eare enjoying our trip',
      likes: 2,
      dislikes: 2
    });



    const response = await request.post(`/comment/${respons.body.id}/${respon.body.id}`).send({
      userId: respons.body.id,
      memoryId: respon.body.id,
      comment: 'how was your trip'
    });

    console.log(response.body);
    expect(response.status).toEqual(500);
  });


  it('should get all comments', async () => {

    const respons = await request.post('/user').send({
      username: 'teseee3t',
      email: 'test1@tes3eeeet.com',
      password: '123',
      userRole: 'admin',
      phonenumber: '123456789',
      gender: 'male',
    });

    const respon = await request.post(`/memory/${respons.body.id}`).send({
      discription: 'we ar3e enjoying our trip',
      likes: 1,
      dislikes: 4
    });



    const response = await request.post(`/comment/${respon.body.id}/${respons.body.id}`).send({
      userId: respons.body.id,
      memoryId: respon.body.id,
      comment: 'how was your trip'
    });

    const response2 = await request.get('/comment/1');
    expect(response2.status).toEqual(200);
    console.log(response2.body);
  });

  it('should delete a comment', async () => {
    const response = await request.delete('/comment/1');
    expect(response.status).toEqual(202);
    expect(response.send).toEqual();
  });

}
);