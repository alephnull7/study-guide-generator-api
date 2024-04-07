const userService = require('../../services/userService');

// GET

describe("userGetValid", () => {
    it("should return an object", async () => {
        const validResponse = { id: 6, email: "email" };
        userService.getUser = jest.fn().mockResolvedValue(validResponse);
        const requestObj = { id: 6 };
        const response = await userService.getUser(requestObj);
        expect(response).toEqual(expect.any(Object));
    });
});

describe("userGetNonexist", () => {
    it("should return 1", async () => {
        const nonExistResponse = 1;
        userService.getUser = jest.fn().mockResolvedValue(nonExistResponse);
        const requestObj = { id: -1 };
        const response = await userService.getUser(requestObj);
        expect(response).toEqual(1);
    });
});

describe("userGetInvalid", () => {
    it("should return 0", async () => {
        const invalidResponse = 0;
        userService.getUser = jest.fn().mockResolvedValue(invalidResponse);
        const requestObj = {};
        const response = await userService.getUser(requestObj);
        expect(response).toEqual(0);
    });
});

// POST

describe("userPostValid", () => {
    it("should return an object", async () => {
        const validResponse = { id: 6, email: "email" };
        userService.createUser = jest.fn().mockResolvedValue(validResponse);
        const requestObj = {
            email: 'test@text.ext',
            account_type: 0,
            password: 'none'
        };
        const response = await userService.createUser(requestObj);
        expect(response).toEqual(expect.any(Object));
    });
});

describe("userPostInvalid", () => {
    it("should return 0", async () => {
        const invalidResponse = 0;
        userService.createUser = jest.fn().mockResolvedValue(invalidResponse);
        const requestObj = {};
        const response = await userService.createUser(requestObj);
        expect(response).toEqual(0);
    });
});

// PUT

describe("userPutValid", () => {
    it("should return an object", async () => {
        const validResponse = { id: 6, email: "email" };
        userService.updateUser = jest.fn().mockResolvedValue(validResponse);
        const requestObj = {
            id: 6,
            email: 'test@text.ext',
            password: 'none'
        };
        const response = await userService.updateUser(requestObj);
        expect(response).toEqual(expect.any(Object));
    });
});

describe("userPutNonexist", () => {
    it("should return 1", async () => {
        const nonExistResponse = 1;
        userService.updateUser = jest.fn().mockResolvedValue(nonExistResponse);
        const requestObj = {
            id: -1,
            email: 'test@text.ext',
            password: 'none'
        };
        const response = await userService.updateUser(requestObj);
        expect(response).toEqual(1);
    });
});

describe("userPutInvalid", () => {
    it("should return 0", async () => {
        const invalidResponse = 0;
        userService.updateUser = jest.fn().mockResolvedValue(invalidResponse);
        const requestObj = {};
        const response = await userService.updateUser(requestObj);
        expect(response).toEqual(0);
    });
});

// DELETE

describe("userDeleteValid", () => {
    it("should return an object", async () => {
        const validResponse = { id: 6, email: "email" };
        userService.deleteUser = jest.fn().mockResolvedValue(validResponse);
        const requestObj = { id: 6 };
        const response = await userService.deleteUser(requestObj);
        expect(response).toEqual(expect.any(Object));
    });
});

describe("userDeleteNonexist", () => {
    it("should return 1", async () => {
        const nonExistResponse = 1;
        userService.deleteUser = jest.fn().mockResolvedValue(nonExistResponse);
        const requestObj = { id: -1 };
        const response = await userService.deleteUser(requestObj);
        expect(response).toEqual(1);
    });
});

describe("userDeleteInvalid", () => {
    it("should return 0", async () => {
        const invalidResponse = 0;
        userService.deleteUser = jest.fn().mockResolvedValue(invalidResponse);
        const requestObj = {};
        const response = await userService.deleteUser(requestObj);
        expect(response).toEqual(0);
    });
});