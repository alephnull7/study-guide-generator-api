const ClassroomModel = require('../models/classroomModel');
const serviceModel = require("./helpers/helpers");
const classroomModel = new ClassroomModel();

class ClassroomService {
    // classroom operations

    async createClassroom(userData) {
        const neededFields = ['uid', 'name', 'course_id', 'students'];
        return await serviceModel(userData, neededFields, classroomModel.createClassroom(userData));
    }

    async getClassroomStudents(userData) {
        const neededFields = ['id'];
        return await serviceModel(userData, neededFields, classroomModel.getClassroomStudents(userData));
    }

    async getClassroomArtifacts(userData) {
        const neededFields = ['id'];
        return await serviceModel(userData, neededFields, classroomModel.getClassroomArtifacts(userData));
    }

    async getClassrooms(userData) {
        const neededFields = ['uid'];
        return await serviceModel(userData, neededFields, classroomModel.getClassrooms(userData));
    }

    async getClassroomsForCourse(userData) {
        const neededFields = ['uid', 'course'];
        return await serviceModel(userData, neededFields, classroomModel.getClassroomsForCourse(userData));
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