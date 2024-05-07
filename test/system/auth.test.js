/*
    Author: Gregory Smith
    Date: May 6, 2024
*/

const request = require('supertest');
const app = require('../../server');

describe('auth', () => {
    it('should login in an existing user', async () => {
        const userData = {
            email: 'jessica.taylor@example.com',
            password: 'example_password'
        };

        const response = await request(app)
            .post(`/api/auth/login`)
            .set('Accept', 'application/json')
            .send(userData)
            .expect('Content-Type', /json/)
            .expect(201);

        expect(response.body).toHaveProperty('username', 'jessica.taylor');
        expect(response.body).toHaveProperty('account_type', 1);
        expect(response.body).toHaveProperty('uid', 'TLRyxzUdydO2PmPLMppajeu6P5J2');
        expect(response.body).toHaveProperty('token');
    }, 100000);

    it('should create a new user', async () => {
        const userData = {
            email: 'elton.john@example.ext',
            password: 'tinydance',
            account_type: 0
        };

        const response = await request(app)
            .post(`/api/auth/create`)
            .set('Accept', 'application/json')
            .send(userData)
            .expect('Content-Type', /json/)
            .expect(201);

        expect(response.body).toHaveProperty('username', 'elton.john');
        expect(response.body).toHaveProperty('account_type', 0);
        expect(response.body).toHaveProperty('uid');
        expect(response.body).toHaveProperty('token');
    }, 100000);
});
