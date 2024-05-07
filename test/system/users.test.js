/*
    Author: Gregory Smith
    Date: May 6, 2024
*/

const request = require('supertest');
const app = require('../../server');

describe('users', () => {
    it('should access an existing user by uid', async () => {
        const userData = {
            uid: 'TLRyxzUdydO2PmPLMppajeu6P5J2',
            username: 'jessica.taylor',
            account_type: 1
        };

        const response = await request(app)
            .get(`/api/users/${userData.uid}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveProperty('username', userData.username);
        expect(response.body).toHaveProperty('account_type', userData.account_type);
        expect(response.body).toHaveProperty('uid', userData.uid);
    });

    it('should access all student users', async () => {
        await request(app)
            .get(`/api/users/students`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
    });
});
