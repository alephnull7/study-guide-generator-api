/*
    Author: Gregory Smith
    Date: May 6, 2024
*/

const ClassroomModel = require('../../models/classroomModel');

describe("getClassrooms", () => {
    it("should return the classrooms the user with the given userId", async () => {
        const classroomModel = new ClassroomModel();
        const requestObj = { uid: "TLRyxzUdydO2PmPLMppajeu6P5J2" };
        const response = await classroomModel.getClassrooms(requestObj);
        expect(typeof response).toEqual('object');
    });
});

describe("handleClassroom", () => {
    it("should create classroom", async () => {
        const classroomModel = new ClassroomModel();
        const requestObj = {
            name: 'test',
            uid: "TLRyxzUdydO2PmPLMppajeu6P5J2",
            course_id: 1
        };

        // create
        const classroomObj = await classroomModel.createClassroom(requestObj);
        expect(classroomObj.instructed).toEqual(requestObj.uid);

        // update
        const newName = 'classroom';
        requestObj.name = newName;
        requestObj.id = classroomObj._id;
        let response = await classroomModel.updateClassroom(requestObj);
        expect(response.name).toEqual(newName);

        // delete
        requestObj.id = classroomObj._id;
        response = await classroomModel.deleteClassroom(requestObj);
        expect(response._id).toEqual(classroomObj._id);
    });
});

describe("handleStudents", () => {
    it("should add and remove students from classroom", async () => {
        const classroomModel = new ClassroomModel();
        const requestObj = {
            id: 30,
            students: ['ytXEMOjan7f6fJWuOSMushGtchJ2', 'VJMsu4WDqbZNQpgRTbJ6SuSuvcq2']
        };
        let response = await classroomModel.addStudents(requestObj);
        expect(response.length).toEqual(2);
        response = await classroomModel.removeStudents(requestObj);
        expect(response.length).toEqual(2);
    }, 10000);
});

describe("assignArtifacts", () => {
    it("should add and remove artifacts from classroom", async () => {
        const classroomModel = new ClassroomModel();
        const requestObj = {
            id: 30,
            artifacts: [12]
        };
        let response = await classroomModel.addArtifacts(requestObj);
        expect(response.length).toEqual(1);
        response = await classroomModel.removeArtifacts(requestObj);
        expect(response.length).toEqual(1);
    }, 10000);
});
