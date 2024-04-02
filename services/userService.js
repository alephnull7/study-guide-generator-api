// userService.js
const UserModel = require('../models/userModel');
const {status} = require("express/lib/response");
const userModel = new UserModel();

class UserService {
    async createUser(userData) {
        const postKeys = Object.keys(userData);
        const neededFields = ['email', 'account_type'];
        for (let field of neededFields) {
            if (!postKeys.includes(field)) {
                return null;
            }
        }
        return await userModel.createUser(userData);
    }

    async getUserById(userData) {
        const postKeys = Object.keys(userData);
        if (!postKeys.includes('id')) {
            return null;
        }
        return await userModel.readUser(userData);
    }

    async updateUser(userId, updatedUserData) {
        // Validate updated user data (if necessary)
        // Perform any business logic related to updating a user
        return await userModel.updateUser(userId, updatedUserData);
    }

    async deleteUser(userId) {
        // Perform any business logic related to deleting a user
        return await userModel.deleteUser(userId);
    }
}

module.exports = new UserService();
