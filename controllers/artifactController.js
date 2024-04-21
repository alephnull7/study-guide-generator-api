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
})

router.get('/templates', async (req, res) => {
    await controlService(req, res, artifactService.getTemplates(req.body));
})

router.get('/:id', async (req, res) => {
    await controlService(req, res, artifactService.readArtifact(req.params));
});

router.get('/study-guides/:uid', async (req, res) => {
    await controlService(req, res, artifactService.readUserStudyGuides(req.params));
});

router.get('/quizzes/:uid', async (req, res) => {
    await controlService(req, res, artifactService.readUserQuizzes(req.params));
});

router.get('/templates/:id', async (req, res) => {
    await controlService(req, res, artifactService.getTemplate(req.params));
})

router.get('/courses/templates/:id', async (req, res) => {
    await controlService(req, res, artifactService.getTemplatesForCourse(req.params));
})

router.get('/courses', async (req, res) => {
    await controlService(req, res, artifactService.getCourses())
})

router.get('/courses/:id', async (req, res) => {
    await controlService(req, res, artifactService.getCoursesForDepartment(req.params))
})

router.get('/departments', async (req, res) => {
    await controlService(req, res, artifactService.getDepartments())
})

module.exports = router;
