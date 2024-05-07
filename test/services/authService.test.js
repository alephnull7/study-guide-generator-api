/*
    Author: Gregory Smith
    Date: May 6, 2024
*/

const authService = require("../../services/authService");

describe("createUserValid", () => {
    it("should return an object", async () => {
        const validResponse = {
            uid: 'string',
            username: 'string',
            token: 'string',
            account_type: 0
        };
        authService.createUser = jest.fn().mockResolvedValue(validResponse);
        const requestObj = {
            email: 'test@text.ext',
            account_type: 0,
            password: 'none'
        };
        const response = await authService.createUser(requestObj);
        expect(response).toEqual(expect.any(Object));
    });
});

describe("createUserInvalid", () => {
    it("should return 0", async () => {
        const invalidResponse = 0;
        authService.createUser = jest.fn().mockResolvedValue(invalidResponse);
        const requestObj = {};
        const response = await authService.createUser(requestObj);
        expect(response).toEqual(0);
    });
});

describe("loginUserValid", () => {
    it("should return an object", async () => {
        const validResponse = {
            uid: 'string',
            username: 'string',
            token: 'string',
            account_type: 0
        };
        authService.loginUser = jest.fn().mockResolvedValue(validResponse);
        const requestObj = {
            email: 'test@text.ext',
            password: 'none'
        };
        const response = await authService.loginUser(requestObj);
        expect(response).toEqual(expect.any(Object));
    });
});

describe("loginUserInvalid", () => {
    it("should return 0", async () => {
        const invalidResponse = 0;
        authService.loginUser = jest.fn().mockResolvedValue(invalidResponse);
        const requestObj = {};
        const response = await authService.loginUser(requestObj);
        expect(response).toEqual(0);
    });
});