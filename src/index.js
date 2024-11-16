const express = require('express'); // creating server and handling requests
const mysql = require('mysql2'); // connecting to database
const dotenv = require('dotenv'); // managing environment variables
const subjectsRoutes = require('./routes/subjects'); //Import subjects route
const topicsRoutes = require('./routes/topics'); //Import topics route
const registerRoutes = require('./routes/register'); // Import registration route
const db = require('./db');
const cors = require('cors');

dotenv.config(); // Load environment variables

const app = express();

app.use(cors());
// Middleware to parse JSON
app.use(express.json());

const PORT = process.env.PORT || 5000;

//Routes
app.use('/api/subjects', subjectsRoutes);
app.use('/api/topics', topicsRoutes);
app.use('/api/register', registerRoutes);

//Port listening message
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});