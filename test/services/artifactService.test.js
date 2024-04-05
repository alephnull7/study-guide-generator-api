const artifactService = require('../../services/artifactService');

describe("studyGuideGetValid", () => {
    it("should return an object", async () => {
        const requestObj = { id: 1 };
        const response = await artifactService.readUserStudyGuides(requestObj);
        expect(response).toEqual(expect.any(Object));
    });
});

describe("studyGuideGetNonexist", () => {
    it("should return 1", async () => {
        const requestObj = { id: -1 };
        const response = await artifactService.readUserStudyGuides(requestObj);
        expect(response).toEqual(1);
    });
});

describe("studyGuideGetInvalid", () => {
    it("should return 0", async () => {
        const requestObj = { };
        const response = await artifactService.readUserStudyGuides(requestObj);
        expect(response).toEqual(0);
    });
});