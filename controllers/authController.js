const express = require('express');
const router = express.Router();
const authService = require('../services/authService');
const controlService = require("./helpers/helpers");

router.post('/', async (req, res) => {
    await controlService(req, res, authService.createUser(req.body));
});

router.get('/', async (req, res) => {
    await controlService(req, res, authService.loginUser(req.body));
});

module.exports = router;
