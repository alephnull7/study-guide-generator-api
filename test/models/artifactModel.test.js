const ArtifactModel = require('../../models/artifactModel');

describe("getStudyGuides", () => {
    it("should return the study guides for the user with the given userId", async () => {
        const artifactModel = new ArtifactModel();
        const requestObj = { id: 1 };
        const response = await artifactModel.readUserStudyGuides(requestObj);
        expect(response[0].name).toEqual('calculus');
    });
});


