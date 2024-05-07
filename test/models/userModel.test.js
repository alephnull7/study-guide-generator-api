/*
    Author: Gregory Smith
    Date: May 6, 2024
*/

const UserModel = require('../../models/userModel');
const AuthModel = require('../../models/authModel');

describe("getUser", () => {
    it("should return the user info for the user with the given uid", async () => {
        const userModel = new UserModel();
        const requestObj = { uid: 'VJMsu4WDqbZNQpgRTbJ6SuSuvcq2' };
        const response = await userModel.getUser(requestObj);
        expect(response.username).toEqual('jane.smith');
    });
});

describe("handleUser", () => {
    it("should create, update, and then delete a new user", async () => {
        const authModel = new AuthModel();
        const requestObj = {
            email: 'elton.john@example.ext',
            password: 'tinydance',
            account_type: 0
        };

        // test creation
        const userObj = await authModel.createUser(requestObj);
        expect(userObj.username).toEqual('elton.john');
        expect(userObj.account_type).toEqual(0);
        expect(typeof userObj.uid).toEqual('string');
        expect(typeof userObj.token).toEqual('string');

        // test update
        const userModel = new UserModel();
        requestObj.username = 'john.elton';
        requestObj.uid = userObj.uid;
        let response = await userModel.updateUser(requestObj);
        expect(response.uid).toEqual(requestObj.uid);
        expect(response.username).toEqual(requestObj.username);

        // test deletion
        response = await userModel.deleteUser(requestObj);
        expect(response.uid).toEqual(requestObj.uid);
    }, 10000);
});
