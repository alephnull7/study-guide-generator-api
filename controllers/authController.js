/*
    Author: Gregory Smith
    Date: May 6, 2024
    Description: Responsible for routing and initializing service requests for authentication
*/

const express = require('express');
const router = express.Router();
const authService = require('../services/authService');
const controlService = require("./helpers/helpers");

router.post('/create', async (req, res) => {
    await controlService(req, res, authService.createUser(req.body));
});

router.post('/login', async (req, res) => {
    await controlService(req, res, authService.loginUser(req.body));
});

module.exports = router;
