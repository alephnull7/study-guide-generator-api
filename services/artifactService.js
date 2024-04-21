const ArtifactModel = require('../models/artifactModel');
const serviceModel = require("./helpers/helpers");
const artifactModel = new ArtifactModel();

class ArtifactService {
    async createArtifactTemplate(userData) {
        const neededFields = ['messages', 'type', 'name', 'course'];
        return await serviceModel(userData, neededFields, artifactModel.createArtifactTemplate(userData));
    }

    async createArtifact(userData) {
        const neededFields = ['user_id', 'template_id', 'name'];
        return await serviceModel(userData, neededFields, artifactModel.createArtifact(userData));
    }

    async readArtifact(userData) {
        const neededFields = ['id'];
        return await serviceModel(userData, neededFields, artifactModel.readArtifact(userData));
    }

    async readUserStudyGuides(userData) {
        const neededFields = ['uid'];
        return await serviceModel(userData, neededFields, artifactModel.readUserStudyGuides(userData));
    }

    async readUserQuizzes(userData) {
        const neededFields = ['uid'];
        return await serviceModel(userData, neededFields, artifactModel.readUserQuizzes(userData));
    }

    async getTemplate(userData) {
        const neededFields = ['id'];
        return await serviceModel(userData, neededFields, artifactModel.getTemplate(userData));
    }

    async getTemplatesForCourse(userData) {
        const neededFields = ['id'];
        return await serviceModel(userData, neededFields, artifactModel.getTemplatesForCourse(userData));
    }

    async getCourses() {
        return await serviceModel({}, [], artifactModel.getCourses());
    }

    async getCoursesForDepartment(userData) {
        const neededFields = ['id'];
        return await serviceModel(userData, neededFields, artifactModel.getCoursesForDepartment(userData));
    }

    async getDepartments() {
        return await serviceModel({}, [], artifactModel.getDepartments());
    }
}

module.exports = new ArtifactService();
