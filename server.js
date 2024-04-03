const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const artifactController = require('./controllers/artifactController');
const classroomController = require('./controllers/classroomController');
const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(bodyParser.json());

// Allow requests from all origins
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Routes
app.use('/api/users', userController); // Mount user routes under '/api/users'
app.use('/api/artifacts', artifactController);
app.use('/api/classrooms', classroomController);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
