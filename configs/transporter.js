const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
const chalk = require("chalk");

dotenv.config();

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT,
    secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// console.log(chalk.red('mail transporter END'));
module.exports = transporter;