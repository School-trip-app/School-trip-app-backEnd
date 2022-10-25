'use strict';

const supertest = require('supertest');
const server = require('../server');
const request = supertest(server.app);



describe('photographer Route', () => {
    it('should create a new package', async () => {
        const response = await request.post('/package').send({
            packageName: "mes 692",
            city: "amman",
            locationName: "amman",
            packageDiscription: "package to iraq al amir in amman",
            tripDate: "2022-10-28",
            numberOfPeople: 25,
            startingTime: "9:00 AM",
            endingTime: "5:00 PM",
            price: 10,
            meals: "lunch",
            pickUpPoint: "School",
            dropPoint: "School",
            rate: 4.5,
            ratePoints: 4.5
        }
        );
        expect(response.status).toEqual(200);
        expect(response.text).toEqual('Package Created Successfuly');

    });


    it('should get all packages', async () => {

        const response2 = await request.get('/package');

        expect(response2.status).toEqual(200);
        expect(response2.body[0].packageName).toEqual('mes 692');
        expect(response2.body[0].city).toEqual('amman');
        expect(response2.body[0].locationName).toEqual('amman');
        expect(response2.body[0].locationLat).toEqual("31.95522");
        expect(response2.body[0].locationLon).toEqual("35.94503");
        expect(response2.body[0].packageDiscription).toEqual('package to iraq al amir in amman');
        expect(response2.body[0].tripDate).toEqual('2022-10-28');
        expect(response2.body[0].numberOfPeople).toEqual(25);
        expect(response2.body[0].startingTime).toEqual('9:00 AM');
        expect(response2.body[0].endingTime).toEqual('5:00 PM');
        expect(response2.body[0].price).toEqual(10);
        expect(response2.body[0].meals).toEqual('lunch');
        expect(response2.body[0].pickUpPoint).toEqual('School');
        expect(response2.body[0].dropPoint).toEqual('School');
        expect(response2.body[0].rate).toEqual(4.5);
        expect(response2.body[0].ratePoints).toEqual(4.5);
        expect(typeof response2.body[0].packageImages).toEqual('object');
        expect(typeof response2.body[0].packageWeatherDetail).toEqual('object');

    });


    it('should update a package', async () => {
        const response3 = await request.put('/package/1').send({
            meals: "dinner",
            price: 100,
        });
        expect(response3.status).toEqual(200);
        expect(response3.text).toEqual('updated');
    });

    it('should get packages after update', async () => {

        const response2 = await request.get('/package');
        expect(response2.body[0].price).toEqual(100);
        expect(response2.body[0].meals).toEqual('dinner');

    });



    it('should update a package rate', async () => {
        const response3 = await request.put('/package/rate/1').send({
            rateInput: 2,
        });
        expect(response3.status).toEqual(200);
        expect(response3.text).toEqual('rate updated');
    }
    );

    it('should get packages after update rate', async () => {

        const response2 = await request.get('/package');
        expect(response2.body[0].rate).toEqual(3.25);
        expect(response2.body[0].ratePoints).toEqual(6.5);
        expect(response2.body[0].ratesNumber).toEqual(2);

    });

    it('should orderPackage', async () => {

        const respons = await request.post('/user').send({
            username: 'test',
            email: 'test1@test.com',
            password: '123',
            userRole: 'admin',
            phonenumber: '123456789',
            gender: 'male',
        });



        const response = await request.post('/photographer').send({
            image: 'https://photographer1.jpg',
            name: 'test',
            email: 'test1@test.com',
            phoneNumber: '123456789',
            rate: 5,
            totalRate: 5,
            price: 100,
        });


        const respon = await request.post('/product').send({
            name: 'suhaib',
            image: 'STRING',
            price: 100,
            quantity: 'STRING',
            discreption: 'STRING',
            category: 'sea',
        })

        const response3 = await request.post('/package/order/2/1/3').send({

            userId: 2,
            packageId: 1,
            photographerId: 3,
            notes: "test",
            medicalIssues: "test",
            specialFood: "test",
            productIds: [2],

        }
        );
        expect(response3.status).toEqual(201);
        expect(response3.text).toEqual('Order sent');

    });

    it('should get all orders', async () => {
        const response = await request.get('/package/order');
        expect(response.status).toEqual(201);
        expect(response.body[0].userId).toEqual(2);
        expect(response.body[0].packageId).toEqual(1);
        expect(response.body[0].photographerId).toEqual(3);
        expect(response.body[0].notes).toEqual('test');
        expect(response.body[0].medicalIssues).toEqual('test');
        expect(response.body[0].specialFood).toEqual('test');
        expect(typeof response.body[0].package).toEqual('object');
        expect(typeof response.body[0].user).toEqual('object');
        expect(typeof response.body[0].photographer).toEqual('object');

    });

    it('should deleteOrder', async () => {
        const response = await request.delete('/package/order/1');
    });

    it('should get all orders after delete', async () => {
        const response = await request.get('/package/order');
        expect(response.status).toEqual(201);
        expect(response.body.length).toEqual(0);

    });


    it('should delete a package', async () => {
        const response4 = await request.delete('/package/1');
        expect(response4.status).toEqual(202);
        expect(response4.text).toEqual('deleted');
    }
    );

    it('should get packages after delete', async () => {

        const response2 = await request.get('/package');
        expect(response2.body.length).toEqual(0);

    });

}
);