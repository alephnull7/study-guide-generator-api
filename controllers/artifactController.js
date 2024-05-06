/*
    Author: Gregory Smith
    Date: May 6, 2024
    Description: Responsible for routing and initializing service requests for artifacts
*/

const express = require('express');
const router = express.Router();
const artifactService = require('../services/artifactService');
const controlService = require("./helpers/helpers");
const authenticateUser = require("../middleware/authentication");

router.use(authenticateUser);

router.post('/templates', async (req, res) => {
    await controlService(req, res, artifactService.createArtifactTemplate(req.body));
});

router.post('/', async (req, res) => {
    await controlService(req, res, artifactService.createArtifact(req.body));
});

router.get('/templates', async (req, res) => {
    await controlService(req, res, artifactService.getTemplates());
});

router.get('/courses', async (req, res) => {
    await controlService(req, res, artifactService.getCourses())
});

router.get('/departments', async (req, res) => {
    await controlService(req, res, artifactService.getDepartments())
});

router.get('/types', async (req, res) => {
    console.log(req);
    await controlService(req, res, artifactService.getTypes())
});

router.get('/:id', async (req, res) => {
    await controlService(req, res, artifactService.readArtifact(req.params));
});

router.get('/pdf/:id', async (req, res) => {
    await controlService(req, res, artifactService.getPDF(req.params));
});

router.get('/study-guides/:uid', async (req, res) => {
    await controlService(req, res, artifactService.readUserStudyGuides(req.params));
});

router.get('/quizzes/:uid', async (req, res) => {
    await controlService(req, res, artifactService.readUserQuizzes(req.params));
});

router.get('/study-guides/owned/:uid', async (req, res) => {
    await controlService(req, res, artifactService.readUserOwnedStudyGuides(req.params));
});

router.get('/study-guides/assigned/:uid', async (req, res) => {
    await controlService(req, res, artifactService.readUserAssignedStudyGuides(req.params));
});

router.get('/quizzes/owned/:uid', async (req, res) => {
    await controlService(req, res, artifactService.readUserOwnedQuizzes(req.params));
});

router.get('/quizzes/assigned/:uid', async (req, res) => {
    await controlService(req, res, artifactService.readUserAssignedQuizzes(req.params));
});

router.get('/templates/study-guides', async (req, res) => {
    await controlService(req, res, artifactService.getStudyGuideTemplates(req.params));
});

router.get('/templates/quizzes', async (req, res) => {
    await controlService(req, res, artifactService.getQuizTemplates(req.params));
});

router.get('/templates/:id', async (req, res) => {
    await controlService(req, res, artifactService.getTemplate(req.params));
});

router.get('/templates/courses/study-guides/:id', async (req, res) => {
    await controlService(req, res, artifactService.getStudyGuideTemplatesForCourse(req.params));
});

router.get('/templates/courses/quizzes/:id', async (req, res) => {
    await controlService(req, res, artifactService.getQuizTemplatesForCourse(req.params));
});

router.get('/templates/courses/:id', async (req, res) => {
    await controlService(req, res, artifactService.getTemplatesForCourse(req.params));
});

router.get('/templates/departments/:id', async (req, res) => {
    await controlService(req, res, artifactService.getTemplatesForDepartment(req.params));
});

router.get('/departments/courses/:id', async (req, res) => {
    await controlService(req, res, artifactService.getCoursesForDepartment(req.params))
});

router.delete('/:id', async (req, res) => {
    await controlService(req, res, artifactService.deleteArtifact(req.params));
});

router.put('/', async (req, res) => {
    await controlService(req, res, artifactService.updateArtifact(req.body));
});

module.exports = router;
