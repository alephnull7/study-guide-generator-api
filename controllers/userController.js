// userController.js
const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const {status} = require("express/lib/response");

router.post('/users', async (req, res) => {
    try {
        const newUser = await userService.createUser(req.body);
        if (newUser === null) {
            res.status(400).json({ message: 'Bad Request' });
        } else {
            res.status(201).json(newUser);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/users/:id', async (req, res) => {
    try {
        const existingUser = await userService.getUserById(req.params);
        if (existingUser === null) {
            res.status(400).json({ message: 'Bad Request' });
        } else {
            res.status(201).json(existingUser);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
