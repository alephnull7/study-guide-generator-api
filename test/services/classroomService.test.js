const classroomService = require('../../services/classroomService');

// GET

describe("classroomGetValid", () => {
    it("should return an object", async () => {
        const validResponse = { id: 6, name: "Classroom 6" };
        classroomService.getClassrooms = jest.fn().mockResolvedValue(validResponse);
        const requestObj = { id: 6 };
        const response = await classroomService.getClassrooms(requestObj);
        expect(response).toEqual(expect.any(Object));
    });
});

describe("classroomGetNonexist", () => {
    it("should return 1", async () => {
        const nonExistResponse = 1;
        classroomService.getClassrooms = jest.fn().mockResolvedValue(nonExistResponse);
        const requestObj = { id: -1 };
        const response = await classroomService.getClassrooms(requestObj);
        expect(response).toEqual(1);
    });
});

describe("classroomGetInvalid", () => {
    it("should return 0", async () => {
        const invalidResponse = 0;
        classroomService.getClassrooms = jest.fn().mockResolvedValue(invalidResponse);
        const requestObj = {};
        const response = await classroomService.getClassrooms(requestObj);
        expect(response).toEqual(0);
    });
});

// POST

describe("classroomPostValid", () => {
    it("should return an object", async () => {
        const validResponse = { id: 42, name: "classroom" };
        classroomService.createClassroom = jest.fn().mockResolvedValue(validResponse);
        const requestObj = { user_id: 6, name: "classroom" };
        const response = await classroomService.createClassroom(requestObj);
        expect(response).toEqual(expect.any(Object));
    });
});

describe("classroomPostInvalid", () => {
    it("should return 0", async () => {
        const invalidResponse = 0;
        classroomService.createClassroom = jest.fn().mockResolvedValue(invalidResponse);
        const requestObj = {};
        const response = await classroomService.createClassroom(requestObj);
        expect(response).toEqual(0);
    });
});

// PUT

describe("classroomPutAddValid", () => {
    it("should return an object", async () => {
        const validResponse = { id: 42, name: "classroom" };
        classroomService.addToClassroom = jest.fn().mockResolvedValue(validResponse);
        const requestObj = {
            id: 4,
            students: [9,39]
        };
        const response = await classroomService.addToClassroom(requestObj);
        expect(response).toEqual(expect.any(Object));
    });
});

describe("classroomPutAddNonexist", () => {
    it("should return 1", async () => {
        const nonExistResponse = 1;
        classroomService.addToClassroom = jest.fn().mockResolvedValue(nonExistResponse);
        const requestObj = {
            id: -1,
            students: [9,39]
        };
        const response = await classroomService.addToClassroom(requestObj);
        expect(response).toEqual(1);
    });
});

describe("classroomPutAddInvalid", () => {
    it("should return 0", async () => {
        const invalidResponse = 0;
        classroomService.addToClassroom = jest.fn().mockResolvedValue(invalidResponse);
        const requestObj = {};
        const response = await classroomService.addToClassroom(requestObj);
        expect(response).toEqual(0);
    });
});

describe("classroomPutRemoveValid", () => {
    it("should return an object", async () => {
        const validResponse = { id: 42, name: "classroom" };
        classroomService.removeFromClassroom = jest.fn().mockResolvedValue(validResponse);
        const requestObj = {
            id: 4,
            students: [9,39]
        };
        const response = await classroomService.removeFromClassroom(requestObj);
        expect(response).toEqual(expect.any(Object));
    });
});

describe("classroomPutRemoveNonexist", () => {
    it("should return 1", async () => {
        const nonExistResponse = 1;
        classroomService.removeFromClassroom = jest.fn().mockResolvedValue(nonExistResponse);
        const requestObj = {
            id: -1,
            students: [9,39]
        };
        const response = await classroomService.removeFromClassroom(requestObj);
        expect(response).toEqual(1);
    });
});

describe("classroomPutRemoveInvalid", () => {
    it("should return 0", async () => {
        const invalidResponse = 0;
        classroomService.removeFromClassroom = jest.fn().mockResolvedValue(invalidResponse);
        const requestObj = {};
        const response = await classroomService.removeFromClassroom(requestObj);
        expect(response).toEqual(0);
    });
});

describe("classroomPutAssignValid", () => {
    it("should return an object", async () => {
        const validResponse = { id: 42, name: "classroom" };
        classroomService.assignToClassroom = jest.fn().mockResolvedValue(validResponse);
        const requestObj = {
            id: 4,
            artifacts: [1,2]
        };
        const response = await classroomService.assignToClassroom(requestObj);
        expect(response).toEqual(expect.any(Object));
    });
});

describe("classroomPutAssignNonexist", () => {
    it("should return 1", async () => {
        const nonExistResponse = 1;
        classroomService.assignToClassroom = jest.fn().mockResolvedValue(nonExistResponse);
        const requestObj = {
            id: -1,
            artifacts: [1,2]
        };
        const response = await classroomService.assignToClassroom(requestObj);
        expect(response).toEqual(1);
    });
});

describe("classroomPutAssignInvalid", () => {
    it("should return 0", async () => {
        const invalidResponse = 0;
        classroomService.assignToClassroom = jest.fn().mockResolvedValue(invalidResponse);
        const requestObj = {};
        const response = await classroomService.assignToClassroom(requestObj);
        expect(response).toEqual(0);
    });
});

// DELETE

describe("classroomDeleteValid", () => {
    it("should return an object", async () => {
        const validResponse = { id: 42, name: "classroom" };
        classroomService.deleteClassroom = jest.fn().mockResolvedValue(validResponse);
        const requestObj = {
            id: 4,
        };
        const response = await classroomService.deleteClassroom(requestObj);
        expect(response).toEqual(expect.any(Object));
    });
});

describe("classroomDeleteNonexist", () => {
    it("should return 1", async () => {
        const nonExistResponse = 1;
        classroomService.deleteClassroom = jest.fn().mockResolvedValue(nonExistResponse);
        const requestObj = {
            id: -1
        };
        const response = await classroomService.deleteClassroom(requestObj);
        expect(response).toEqual(1);
    });
});

describe("classroomDeleteInvalid", () => {
    it("should return 0", async () => {
        const invalidResponse = 0;
        classroomService.deleteClassroom = jest.fn().mockResolvedValue(invalidResponse);
        const requestObj = {};
        const response = await classroomService.deleteClassroom(requestObj);
        expect(response).toEqual(0);
    });
});