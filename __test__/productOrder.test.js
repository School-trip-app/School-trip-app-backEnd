'use strict';

const supertest = require('supertest');
const server = require('../server');
const request = supertest(server.app);

/*  

router.post('/productOrder/:productId', addProductOrder);
router.get('/productOrder', getProductOrder);
router.put('/productOrder/:id', updateProductOrder);
router.delete('/productOrder/:id', deleteProductOrder);


*/


describe('product Route', () => { 
  
  it('should create a new productOrder', async () => {
    const response = await request.post('/productOrder/1').send({ orderQuentity: 2 });
    expect(response.status).toEqual(201);
    expect(response.body.orderQuentity).toEqual(2);
  })
  it('should get all productOrder', async () => {
    const response = await request.get('/productOrder');
    expect(response.status).toEqual(200);
  })
  it('should update a productOrder', async () => {
    const response = await request.put('/productOrder/1').send({ orderQuentity: 3 });
    expect(response.status).toEqual(200);
  }
  );
  it('should delete a productOrder', async () => {
    const response = await request.delete('/productOrder/1');
    expect(response.status).toEqual(200);
    
  }
  );
});

