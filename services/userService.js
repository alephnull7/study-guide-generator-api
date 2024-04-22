const UserModel = require('../models/userModel');
const serviceModel = require("./helpers/helpers");
const userModel = new UserModel();

class UserService {
    async getUser(userData) {
        const neededFields = ['uid'];
        return await serviceModel(userData, neededFields, userModel.getUser(userData));
    }

    async getStudents() {
        return await serviceModel({}, [], userModel.getStudents());
    }

    async updateUser(userData) {
        const neededFields = ['email', 'id'];
        return await serviceModel(userData, neededFields, userModel.updateUser(userData));
    }

    async deleteUser(userData) {
        const neededFields = ['id'];
        return await serviceModel(userData, neededFields, userModel.deleteUser(userData));
    }
}

module.exports = new UserService();
