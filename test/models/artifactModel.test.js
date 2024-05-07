/*
    Author: Gregory Smith
    Date: May 6, 2024
*/

const ArtifactModel = require('../../models/artifactModel');

describe("createArtifact", () => {
   it("should create, update, and then delete an artifact", async () => {
       const artifactModel = new ArtifactModel();
       const requestObj = {
           uid: 'VJMsu4WDqbZNQpgRTbJ6SuSuvcq2',
           template_id: 48,
           name: 'example_artifact',
           classrooms: []
       };

       // create
       const artifactObj = await artifactModel.createArtifact(requestObj);

       // update
       const newName = 'new_name';
       requestObj.name = newName;
       requestObj.id = artifactObj._id;
       let response = await artifactModel.updateArtifact(requestObj);
       expect(response.name).toBe(newName);

       // delete
       response = await artifactModel.deleteArtifact(requestObj);
       expect(response._id).toBe(requestObj.id);
   }, 1000000)
});

describe("readArtifact", () => {
    it("read a defined artifact", async () => {
        const artifactModel = new ArtifactModel();
        const requestObj = {
            id: 25
        };
        const response = await artifactModel.readArtifact(requestObj);
        expect(response.name).toBe('CSCI 121 - Chapter 4 Study Guide');
    })
});

describe("getPDF", () => {
    it("respond with a PDF buffer object", async () => {
        const artifactModel = new ArtifactModel();
        const requestObj = {
            id: 25
        };
        const response = await artifactModel.getPDF(requestObj);
        expect(response.hasOwnProperty('buffer')).toBe(true);
    })
});

