/*
    Author: Gregory Smith
    Date: May 6, 2024
    Description: Responsible for routing and initializing service requests for users
*/

const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const controlService = require("./helpers/helpers");
const authenticateUser = require("../middleware/authentication");

router.use(authenticateUser);

router.get('/students', async (req, res) => {
    await controlService(req, res, userService.getStudents());
});

router.get('/:uid', async (req, res) => {
    await controlService(req, res, userService.getUser(req.params));
});

router.put('/', async (req, res) => {
    await controlService(req, res, userService.updateUser(req.body));
});

router.delete('/:uid', async (req, res) => {
    await controlService(req, res, userService.deleteUser(req.params));
});

module.exports = router;
