/*
    Author: Gregory Smith
    Date: May 6, 2024
*/

const AuthModel = require("../../models/authModel");

describe("handleLogin", () => {
    it("should successfully login an existing user", async () => {
        const authModel = new AuthModel();
        const requestObj = {
            email: 'jessica.taylor@example.com',
            password: 'example_password'
        };

        // test creation
        const userObj = await authModel.loginUser(requestObj);
        console.log(userObj);
        expect(userObj.username).toEqual('jessica.taylor');
        expect(userObj.account_type).toEqual(1);
        expect(userObj.uid).toEqual('TLRyxzUdydO2PmPLMppajeu6P5J2');
        expect(typeof userObj.token).toEqual('string');
    }, 100000);

    it("should fail to login an unknown user", async () => {
        const authModel = new AuthModel();
        const requestObj = {
            email: 'elton.john@example.ext',
            password: 'tinydance',
        };
        const userObj = await authModel.loginUser(requestObj);
        expect(userObj).toEqual(2);
    }, 100000);

    it("should fail to login an existing user with the wrong password", async () => {
        const authModel = new AuthModel();
        const requestObj = {
            email: 'jessica.taylor@example.com',
            password: 'wrong_password'
        }
        const userObj = await authModel.loginUser(requestObj);
        expect(userObj).toEqual(2);
    }, 100000);
});
