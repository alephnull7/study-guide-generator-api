const ClassroomModel = require('../models/classroomModel');
const serviceModel = require("./helpers/helpers");
const classroomModel = new ClassroomModel();

class ClassroomService {
    async createClassroom(userData) {
        const neededFields = ['user_id', 'name'];
        return await serviceModel(userData, neededFields, classroomModel.createClassroom(userData));
    }

    async getClassroom(userData) {
        const neededFields = ['id'];
        return await serviceModel(userData, neededFields, classroomModel.getClassroom(userData));
    }

    async addToClassroom(userData) {
        const neededFields = ['id', 'students'];
        return await serviceModel(userData, neededFields, classroomModel.addToClassroom(userData));
    }

    async removeFromClassroom(userData) {
        const neededFields = ['id', 'students'];
        return await serviceModel(userData, neededFields, classroomModel.removeFromClassroom(userData));
    }

    async assignToClassroom(userData) {
        const neededFields = ['id', 'artifacts'];
        return await serviceModel(userData, neededFields, classroomModel.assignToClassroom(userData));
    }

    async deleteClassroom(userData) {
        const neededFields = ['id'];
        return await serviceModel(userData, neededFields, classroomModel.deleteClassroom(userData));
    }
}

module.exports = new ClassroomService();