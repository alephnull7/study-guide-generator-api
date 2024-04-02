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
        let userStudyGuides = await userService.getUserStudyGuides(req.params);
        switch (userStudyGuides) {
            case 0:
                res.status(400).json({ message: 'Bad Request' });
                break;
            case 1:
                res.status(204).send();
                break;
            default:
                res.status(201).json(userStudyGuides);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
