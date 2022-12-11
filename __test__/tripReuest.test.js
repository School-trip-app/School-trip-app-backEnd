'use strict';

const supertest = require('supertest');
const server = require('../server');
const request = supertest(server.app);



describe('tripRequest Route', () => {
    it('should create a new tripRequest', async () => {

        const respons = await request.post('/user').send({
            username: 'Ahmad',
            email: 'test@test.com',
            password: '123',
            userRole: 'admin',
            phonenumber: '123456789',
            gender: 'male',
        });

        console.log(respons.body.id);
        console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')


        const response = await request.post('/tripRequest').send({
            place: 'amman',
            date: '2021-06-25',
            numberOfStudents: 10,
            contactMethod: 'test@test.com',
            otherDetails: 'test',
            userId: respons.body.id
        });
        expect(response.status).toEqual(201);
        expect(response.body.place).toEqual('amman');
        expect(response.body.date).toEqual('2021-06-25');
        expect(response.body.numberOfStudents).toEqual(10);
        expect(response.body.contactMethod).toEqual('test@test.com');
        expect(response.body.otherDetails).toEqual('test');
        expect(response.body.userId).toEqual(respons.body.id);


    });

    it('should get all tripRequest', async () => {
        const response = await request.get('/tripRequest');
        expect(response.status).toEqual(200);
        expect(response.body[0].place).toEqual('amman');
        expect(response.body[0].date).toEqual('2021-06-25');
        expect(response.body[0].numberOfStudents).toEqual(10);
        expect(response.body[0].contactMethod).toEqual('test@test.com');
        expect(response.body[0].otherDetails).toEqual('test');
    });

    it('should update a tripRequest', async () => {

        const response = await request.put(`/tripRequest/1`).send({
            place: 'Aqaba'
        }
        );
        expect(response.status).toEqual(200);
        expect(response.text).toEqual('updated');
    });

    it('should get all tripRequest', async () => {
        const response = await request.get('/tripRequest');
        expect(response.status).toEqual(200);
        expect(response.body[0].place).toEqual('Aqaba');
        
    });


    it('should get all tripRequest with user', async () => {
        const response = await request.get('/usersWithRequest');
        expect(response.status).toEqual(200);
        expect(response.body[0].username).toEqual('Ahmad');
        expect(response.body[0].email).toEqual('test@test.com');
        expect(response.body[0].userRole).toEqual('admin');
        expect(response.body[0].phonenumber).toEqual('123456789');
        expect(response.body[0].tripRequests[0].place).toEqual('Aqaba');
        expect(response.body[0].tripRequests[0].date).toEqual('2021-06-25');    
        expect(response.body[0].tripRequests[0].numberOfStudents).toEqual(10);
        expect(response.body[0].tripRequests[0].contactMethod).toEqual('test@test.com');
        expect(response.body[0].tripRequests[0].otherDetails).toEqual('test');
    });

});