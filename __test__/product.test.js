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
        const response = await request.get('/product');

        expect(response.status).toEqual(200);
        expect(response.body[0].name).toEqual('suhaib');
        expect(response.body[0].image).toEqual('STRING');
        expect(response.body[0].price).toEqual(100);
        expect(response.body[0].quantity).toEqual('STRING');
        expect(response.body[0].discreption).toEqual('STRING');
        expect(response.body[0].category).toEqual('sea');
    }
    );

    it('should update a product', async () => {

        const response = await request.put('/product/1').send({
            name: 'ahmad',
        });

        expect(response.status).toEqual(200);
      
    }
    );

    it('should delete a product', async () => {
        const response = await request.delete('/product/2'); // id 2 already deleted

        expect(response.status).toEqual(200);

    }
    );
});