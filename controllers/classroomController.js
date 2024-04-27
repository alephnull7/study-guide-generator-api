const express = require('express');
const router = express.Router();
const classroomService = require('../services/classroomService');
const controlService = require("./helpers/helpers");
const authenticateUser = require("../middleware/authentication");

router.use(authenticateUser);

router.post('/', async (req, res) => {
    await controlService(req, res, classroomService.createClassroom(req.body));
});

router.get('/students/:id', async (req, res) => {
    await controlService(req, res, classroomService.getClassroomStudents(req.params));
});

router.get('/artifacts/study-guides/:id', async (req, res) => {
    await controlService(req, res, classroomService.getClassroomStudyGuides(req.params));
});

router.get('/artifacts/quizzes/:id', async (req, res) => {
    await controlService(req, res, classroomService.getClassroomQuizzes(req.params));
});

router.get('/artifacts/:id', async (req, res) => {
    await controlService(req, res, classroomService.getClassroomArtifacts(req.params));
});

router.get('/:uid', async (req, res) => {
    await controlService(req, res, classroomService.getClassrooms(req.params));
});

router.get('/instructors/:uid/:course', async (req, res) => {
    await controlService(req, res, classroomService.getClassroomsForCourse(req.params));
});

router.put('/', async (req, res) => {
    await controlService(req, res, classroomService.updateClassroom(req.body));
});

router.delete('/:id', async (req, res) => {
    await controlService(req, res, classroomService.deleteClassroom(req.params));
});

router.put('/students/add', async (req, res) => {
    await controlService(req, res, classroomService.addStudents(req.body));
});

router.put('/students/remove', async (req, res) => {
    await controlService(req, res, classroomService.removeStudents(req.body));
});

router.put('/artifacts/add', async (req, res) => {
    await controlService(req, res, classroomService.addArtifacts(req.body));
});

router.put('/artifacts/remove', async (req, res) => {
    await controlService(req, res, classroomService.removeArtifacts(req.body));
});

module.exports = router;
