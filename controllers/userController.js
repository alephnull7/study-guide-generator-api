const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const controlService = require("./helpers/helpers");

router.post('/', async (req, res) => {
    await controlService(req, res, userService.createUser(req.body));
});

router.get('/auth', async (req, res) => {
    await controlService(req, res, userService.loginUser(req.body));
});

router.get('/:uid', async (req, res) => {
    await controlService(req, res, userService.getUser(req.params));
});

router.put('/', async (req, res) => {
    await controlService(req, res, userService.updateUser(req.body));
});

router.delete('/', async (req, res) => {
    await controlService(req, res, userService.deleteUser(req.body));
});

module.exports = router;
