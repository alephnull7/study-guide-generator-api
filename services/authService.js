const AuthModel = require('../models/authModel');
const serviceModel = require("./helpers/helpers");
const authModel = new AuthModel();

class AuthService {
    async createUser(userData) {
        const neededFields = ['email', 'password', 'account_type'];
        return await serviceModel(userData, neededFields, authModel.createUser(userData));
    }
    async loginUser(userData) {
        const neededFields = ['email', 'password'];
        return await serviceModel(userData, neededFields, authModel.loginUser(userData));
    }
}

module.exports = new AuthService();
