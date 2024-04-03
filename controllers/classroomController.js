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

router.put('/add', async (req, res) => {
    await controlService(req, res, classroomService.addToClassroom(req.body));
});

router.put('/remove', async (req, res) => {
    await controlService(req, res, classroomService.removeFromClassroom(req.body));
});

router.put('/assign', async (req, res) => {
    await controlService(req, res, classroomService.assignToClassroom(req.body));
});

router.delete('/', async (req, res) => {
    await controlService(req, res, classroomService.deleteClassroom(req.body));
});

module.exports = router;
