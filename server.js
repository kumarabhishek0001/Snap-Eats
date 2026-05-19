const express = require('express');
const dotenv = require('dotenv');
const chalk = require("chalk");
const morgan = require('morgan');

// DOTENV CONFIG
dotenv.config({ path: './.env', quiet: true });

// FILE IMPORTS
const connectDb = require('./configs/db');
const verifyMail = require('./configs/verify');


// EXPRESS CONFIG
const app = express();
const PORT = process.env.BACKEND_PORT || 8080;

// CONNECTING TO DB
connectDb();

// VERIFY MAIL SERVICE WORKING
// verifyMail();

// MIDDLEWARE
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));


// ROUTES
app.use('/api/v1/testRoute', require('./routes/testRoutes'));
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/user', require('./routes/users.routes'))


app.listen(PORT, () => {
    console.log("Server live on: ", chalk.bgCyan(`http://localhost:${PORT}`));
})