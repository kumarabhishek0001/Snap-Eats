const dotenv = require('dotenv');
dotenv.config({ path: './.env', quiet: true });
const morgan = require('morgan');

const chalk = require("chalk");


// EXPRESS CONFIG
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;


// MIDDLEWARE
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));



app.get("/", (req, res) => {
    res.send("<h1> Sever is Live </h1>");
})



app.listen(PORT, () => {
    console.log("Server live on: ", chalk.bgCyan(`http://localhost:${PORT}`));
})