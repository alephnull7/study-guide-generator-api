const express = require('express');
const router = express.Router();
const artifactService = require('../services/artifactService');
const controlService = require("./helpers/helpers");

router.get('/study-guides/:id', async (req, res) => {
    await controlService(req, res, artifactService.readUserStudyGuides(req.params));
});

router.get('/quizzes/:id', async (req, res) => {
    await controlService(req, res, artifactService.readUserQuizzes(req.params));
});

module.exports = router;
