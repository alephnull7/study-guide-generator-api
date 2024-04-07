const UserModel = require('../../models/userModel');

describe("getUser", () => {
    it("should return the user info for the user with the given userId", async () => {
        const userModel = new UserModel();
        const requestObj = { id: 1 };
        const response = await userModel.getUser(requestObj);
        expect(response.email).toEqual('email@domain.ext');
    });
});

describe("handleUser", () => {
    it("should create, update, and then delete a new user", async () => {
        const userModel = new UserModel();
        const requestObj = {
            email: 'test@text.ext',
            account_type: 0,
            password: 'none'
        };

        // test creation
        const userObj = await userModel.createUser(requestObj);
        expect(userObj.email).toEqual(requestObj.email);

        // test update
        requestObj.email += '2';
        requestObj.id = userObj._id;
        let response = await userModel.updateUser(requestObj);
        expect(response._id).toEqual(requestObj.id);
        expect(response.email).toEqual(requestObj.email);

        // test deletion
        response = await userModel.deleteUser(requestObj);
        expect(response._id).toEqual(requestObj.id);
    }, 10000);
});
