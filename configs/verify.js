const chalk = require("chalk");
const { transporter } = require("./transporter");


const verifyMail = async () => {
    try {
        await transporter.verify();
        console.log(chalk.bgBlue("Server is ready to send email"));

    } catch (err) {
        console.error("Verification failed:", err);
    }
}


// console.log(chalk.red('mail verify END'));
module.exports = verifyMail;