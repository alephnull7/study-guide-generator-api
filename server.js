const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', userController); // Mount user routes under '/api/users'

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
