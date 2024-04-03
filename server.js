const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const artifactController = require('./controllers/artifactController');
const classroomController = require('./controllers/classroomController');
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(bodyParser.json());

// Middleware to enable CORS
app.use(cors());

// Routes
app.use('/api/users', userController); // Mount user routes under '/api/users'
app.use('/api/artifacts', artifactController);
app.use('/api/classrooms', classroomController);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
