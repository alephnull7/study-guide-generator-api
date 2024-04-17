const express = require('express');
const router = express.Router();
const classroomService = require('../services/classroomService');
const controlService = require("./helpers/helpers");

router.post('/', async (req, res) => {
    await controlService(req, res, classroomService.createClassroom(req.body));
});

router.get('/:id', async (req, res) => {
    await controlService(req, res, classroomService.getClassroom(req.params));
});

router.get('/instructors/:id', async (req, res) => {
    await controlService(req, res, classroomService.getClassrooms(req.params));
});

router.put('/', async (req, res) => {
    await controlService(req, res, classroomService.updateClassroom(req.body));
});

router.delete('/', async (req, res) => {
    await controlService(req, res, classroomService.deleteClassroom(req.body));
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
