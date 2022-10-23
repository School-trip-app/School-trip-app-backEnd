'use strict';

const supertest = require('supertest');
const server = require('../server');
const request = supertest(server.app);
describe('product Route', () => {
  it('should create a new product', async () => {
    const response = await request.post('/product').send({

      name: 'suhaib',
      image: 'STRING',
      price: 100,
      quantity: 'STRING',
      discreption: 'STRING',
      category: 'sea',
    })
    expect(response.status).toEqual(201);

    expect(response.body.name).toEqual('suhaib');
    expect(response.body.image).toEqual('STRING');
    expect(response.body.price).toEqual(100);
    expect(response.body.quantity).toEqual('STRING');
    expect(response.body.discreption).toEqual('STRING');
    expect(response.body.category).toEqual('sea');
  });

  it('should get all products', async () => {
    const response = await request.post('/product').send({

      name: 'suhaib',
      image: 'STRING',
      price: 100,
      quantity: 'STRING',
      discreption: 'STRING',
      category: 'sea',
    })
    const response2 = await request.get('/product');
    expect(response2.status).toEqual(200);
    expect(response2.body[0].name).toEqual('suhaib');
    expect(response2.body[0].image).toEqual('STRING');
    expect(response2.body[0].price).toEqual(100);
    expect(response2.body[0].quantity).toEqual('STRING');
    expect(response2.body[0].discreption).toEqual('STRING');
    expect(response2.body[0].category).toEqual('sea');
  }
  );
    
 
  it('should update a product', async () => {
    const response = await request.post('/product').send({

      name: 'suhaib1',
      image: 'STRING1',
      price: 101,
      quantity: 'STRING1',
      discreption: 'STRING1',
      category: 'desert',
    })
    const response2 = await request.put('/product/3');
    expect(response2.status).toEqual(200);
    expect(response2.body.name).toEqual('suhaib1');
    expect(response2.body.image).toEqual('STRING1');
    expect(response2.body.price).toEqual(101);
    expect(response2.body.quantity).toEqual('STRING1');
    expect(response2.body.discreption).toEqual('STRING1');
    expect(response2.body.category).toEqual('desert');
  }
  );


/* 

 it("should delete a post", async () => {
    const response = await request.delete(`/post/${adminPostId}`).set({
      Authorization: `Bearer ${adminToken}`,
    });

    expect(response.status).toEqual(204);
  });

*/


  it('should delete a product', async () => {
    const response = await request.delete('/product/2'); // id 2 already deleted

    expect(response.status).toEqual(200);
    
  }
  );
});




