const express = require('express');
const dotenv = require('dotenv');
const chalk = require("chalk");
const morgan = require('morgan');

// DOTENV CONFIG
dotenv.config({ path: './.env', quiet: true });

// FILE IMPORTS
const connectDb = require('./configs/db');

// EXPRESS CONFIG
const app = express();
const PORT = process.env.PORT || 8080;

// CONNECTING TO DB
connectDb();

// MIDDLEWARE
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));


// ROUTES
app.use('/api/v1/testRoute', require('./routes/testRoutes'));
app.use('/api/v1/auth', require('./routes/authRoutes'))


app.listen(PORT, () => {
    console.log("Server live on: ", chalk.bgCyan(`http://localhost:${PORT}`));
})