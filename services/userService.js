const UserModel = require('../models/userModel');
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

    async getUser(userData) {
        const getKeys = Object.keys(userData);
        if (!getKeys.includes('id')) {
            return 0;
        }
        return await userModel.getUser(userData);
    }

    async updateUser(userData) {
        const putKeys = Object.keys(userData);
        const neededFields = ['email', 'id'];
        for (let field of neededFields) {
            if (!putKeys.includes(field)) {
                return 0;
            }
        }
        return await userModel.updateUser(userData);
    }

    async deleteUser(userData) {
        const deleteKeys = Object.keys(userData);
        if (!deleteKeys.includes('id')) {
            return 0;
        }
        return await userModel.deleteUser(userData);
    }
}

module.exports = new UserService();
