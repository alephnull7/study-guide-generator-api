/*
    Author: Gregory Smith
    Date: May 6, 2024
    Description: Responsible for providing requests to the ArtifactModel
*/

const ArtifactModel = require('../models/artifactModel');
const serviceModel = require("./helpers/helpers");
const artifactModel = new ArtifactModel();

class ArtifactService {
    async createArtifactTemplate(userData) {
        const neededFields = ['messages', 'type', 'name', 'course'];
        return await serviceModel(userData, neededFields, artifactModel.createArtifactTemplate(userData));
    }

    async createArtifact(userData) {
        const neededFields = ['uid', 'template_id', 'name', 'classrooms'];
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

    async readUserOwnedStudyGuides(userData) {
        const neededFields = ['uid'];
        return await serviceModel(userData, neededFields, artifactModel.readUserOwnedStudyGuides(userData));
    }

    async readUserAssignedStudyGuides(userData) {
        const neededFields = ['uid'];
        return await serviceModel(userData, neededFields, artifactModel.readUserAssignedStudyGuides(userData));
    }

    async readUserQuizzes(userData) {
        const neededFields = ['uid'];
        return await serviceModel(userData, neededFields, artifactModel.readUserQuizzes(userData));
    }

    async readUserOwnedQuizzes(userData) {
        const neededFields = ['uid'];
        return await serviceModel(userData, neededFields, artifactModel.readUserOwnedQuizzes(userData));
    }

    async readUserAssignedQuizzes(userData) {
        const neededFields = ['uid'];
        return await serviceModel(userData, neededFields, artifactModel.readUserAssignedQuizzes(userData));
    }

    async getTemplates() {
        return await serviceModel({}, [], artifactModel.getTemplates());
    }

    async getStudyGuideTemplates() {
        return await serviceModel({}, [], artifactModel.getStudyGuideTemplates());
    }

    async getQuizTemplates() {
        return await serviceModel({}, [], artifactModel.getQuizTemplates());
    }

    async getTemplate(userData) {
        const neededFields = ['id'];
        return await serviceModel(userData, neededFields, artifactModel.getTemplate(userData));
    }

    async getTemplatesForCourse(userData) {
        const neededFields = ['id'];
        return await serviceModel(userData, neededFields, artifactModel.getTemplatesForCourse(userData));
    }

    async getStudyGuideTemplatesForCourse(userData) {
        const neededFields = ['id'];
        return await serviceModel(userData, neededFields, artifactModel.getStudyGuideTemplatesForCourse(userData));
    }

    async getQuizTemplatesForCourse(userData) {
        const neededFields = ['id'];
        return await serviceModel(userData, neededFields, artifactModel.getQuizTemplatesForCourse(userData));
    }

    async getTemplatesForDepartment(userData) {
        const neededFields = ['id'];
        return await serviceModel(userData, neededFields, artifactModel.getTemplatesForDepartment(userData));
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

    async getTypes() {
        return await serviceModel({}, [], artifactModel.getTypes());
    }

    async deleteArtifact(userData) {
        const neededFields = ['id'];
        return await serviceModel(userData, neededFields, artifactModel.deleteArtifact(userData));
    }

    async updateArtifact(userData) {
        const neededFields = ['id', 'name'];
        return await serviceModel(userData, neededFields, artifactModel.updateArtifact(userData));
    }

    async getPDF(userData) {
        const neededFields = ['id'];
        return await serviceModel(userData, neededFields, artifactModel.getPDF(userData));
    }
}

module.exports = new ArtifactService();
