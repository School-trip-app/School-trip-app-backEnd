'use strict';

const supertest = require('supertest');
const server = require('../server');
const request = supertest(server.app);



describe('photographer Route', () => {
    it('should create a new photographer', async () => {
        const response = await request.post('/photographer').send({
            image: 'https://photographer1.jpg',
            name: 'Ahmad',
            email: 'test@test.com',
            phoneNumber: '123456789',
            rate: 5,
            totalRate: 5,
            price: 100,
        });
        expect(response.status).toEqual(200);
        expect(response.body.image).toEqual('https://photographer1.jpg');
        expect(response.body.name).toEqual('Ahmad');
        expect(response.body.email).toEqual('test@test.com');
        expect(response.body.phoneNumber).toEqual('123456789');
        expect(response.body.rate).toEqual(5);
        expect(response.body.totalRate).toEqual(5);
        expect(response.body.price).toEqual(100);
    });


    it('should get all photographers', async () => {

        const response2 = await request.get('/photographer');
        
        expect(response2.status).toEqual(200);
        expect(response2.body[0].image).toEqual('https://photographer1.jpg');
        expect(response2.body[0].name).toEqual('Ahmad');
        expect(response2.body[0].email).toEqual('test@test.com');
        expect(response2.body[0].phoneNumber).toEqual('123456789');
        expect(response2.body[0].rate).toEqual(5);
        expect(response2.body[0].totalRate).toEqual(5);
        expect(response2.body[0].price).toEqual(100);
    });

    it('should update the rate of a photographer', async () => {
        const response = await request.post('/photographer').send({
            image: 'https://photographer1.jpg',
            name: 'Ahmad',
            email: 'test@test.com',
            phoneNumber: '123456789',
            rate: 5,
            totalRate: 5,
            price: 100,
        });
        response.body.id
        const response2 = await request.put(`/photographer/${response.body.id}`).send({
            rateInput: 3,
        });
        expect(response2.status).toEqual(200);
        expect(response2.body.rate).toEqual(4);
        expect(response2.body.totalRate).toEqual(8);
    });
}
);