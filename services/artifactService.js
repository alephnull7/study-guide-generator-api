const ArtifactModel = require('../models/artifactModel');
const serviceModel = require("./helpers/helpers");
const artifactModel = new ArtifactModel();

class ArtifactService {
    async readUserStudyGuides(userData) {
        const neededFields = ['id'];
        return await serviceModel(userData, neededFields, artifactModel.readUserStudyGuides(userData));
    }

    async readUserQuizzes(userData) {
        const neededFields = ['id'];
        return await serviceModel(userData, neededFields, artifactModel.readUserQuizzes(userData));
    }
}

module.exports = new ArtifactService();
