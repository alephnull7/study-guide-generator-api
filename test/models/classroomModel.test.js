const ClassroomModel = require('../../models/classroomModel');

describe("getClassrooms", () => {
    it("should return the classrooms the user with the given userId", async () => {
        const classroomModel = new ClassroomModel();
        const requestObj = { id: 6 };
        const response = await classroomModel.getClassrooms(requestObj);
        console.log(response);
        expect(response.length).toEqual(7);
    });
});

describe("handleClassroom", () => {
    it("should create classroom", async () => {
        const classroomModel = new ClassroomModel();
        const requestObj = {
            name: 'test',
            user_id: 6
        };

        // create
        const classroomObj = await classroomModel.createClassroom(requestObj);
        expect(classroomObj.instructed).toEqual(requestObj.user_id);

       // delete
        requestObj.id = classroomObj._id;
        const response = await classroomModel.deleteClassroom(requestObj);
        expect(response._id).toEqual(classroomObj._id);
    });
});

describe("handleStudents", () => {
    it("should add and remove students from classroom", async () => {
        const classroomModel = new ClassroomModel();
        const requestObj = {
            id: 4,
            students: [9,39]
        };
        let response = await classroomModel.addToClassroom(requestObj);
        expect(response.length).toEqual(2);
        response = await classroomModel.removeFromClassroom(requestObj);
        expect(response.length).toEqual(2);
    }, 10000);
});

describe("assignArtifacts", () => {
    it("should add and remove students from classroom", async () => {
        const classroomModel = new ClassroomModel();
        const requestObj = {
            id: 4,
            artifacts: [2]
        };
        const response = await classroomModel.assignToClassroom(requestObj);
        expect(response.length).toEqual(1);
    }, 10000);
});
