const ClassroomModel = require('../models/classroomModel');
const serviceModel = require("./helpers/helpers");
const classroomModel = new ClassroomModel();

class ClassroomService {
    // classroom operations

    async createClassroom(userData) {
        const neededFields = ['user_id', 'name'];
        return await serviceModel(userData, neededFields, classroomModel.createClassroom(userData));
    }

    async getClassroom(userData) {
        const neededFields = ['id'];
        return await serviceModel(userData, neededFields, classroomModel.getClassroom(userData));
    }

    async getClassrooms(userData) {
        const neededFields = ['id'];
        return await serviceModel(userData, neededFields, classroomModel.getClassrooms(userData));
    }

    async updateClassroom(userData) {
        const neededFields = ['id', 'name'];
        return await serviceModel(userData, neededFields, classroomModel.updateClassroom(userData));
    }

    async deleteClassroom(userData) {
        const neededFields = ['id'];
        return await serviceModel(userData, neededFields, classroomModel.deleteClassroom(userData));
    }

    // junction table operations

    async addStudents(userData) {
        const neededFields = ['id', 'students'];
        return await serviceModel(userData, neededFields, classroomModel.addStudents(userData));
    }

    async removeStudents(userData) {
        const neededFields = ['id', 'students'];
        return await serviceModel(userData, neededFields, classroomModel.removeStudents(userData));
    }

    async addArtifacts(userData) {
        const neededFields = ['id', 'artifacts'];
        return await serviceModel(userData, neededFields, classroomModel.addArtifacts(userData));
    }

    async removeArtifacts(userData) {
        const neededFields = ['id', 'artifacts'];
        return await serviceModel(userData, neededFields, classroomModel.removeArtifacts(userData));
    }
}

module.exports = new ClassroomService();