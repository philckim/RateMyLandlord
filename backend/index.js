const express = require('express');
const app = express();
const path = require('path');
const connectDB = require('./config/db');

const PORT = 3000;

// Connect to Database
connectDB();

// Middleware
app.use(express.json());

// Api Endpoint routes
app.use('/api/managers', require('./routes/managers'));

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})