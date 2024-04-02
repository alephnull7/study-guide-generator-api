const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

router.post('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
    try {
        console.log(req.params);
        let currentUser = await userService.getUser(req.params);
        switch (currentUser) {
            case 0:
                res.status(400).json({ message: 'Bad Request' });
                break;
            case 1:
                res.status(204).send();
                break;
            default:
                res.status(201).json(currentUser);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.put('/', async (req, res) => {
    try {
        let updatedUser = await userService.updateUser(req.body);
        console.log(updatedUser);
        switch (updatedUser) {
            case 0:
                res.status(400).json({ message: 'Bad Request' });
                break;
            case 1:
                res.status(204).send();
                break;
            default:
                res.status(201).json(updatedUser);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.delete('/', async (req, res) => {
    try {
        let deletedUser = await userService.deleteUser(req.body);
        console.log(deletedUser);
        switch (deletedUser) {
            case 0:
                res.status(400).json({ message: 'Bad Request' });
                break;
            case 1:
                res.status(204).send();
                break;
            default:
                res.status(201).json(deletedUser);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
