const chalk = require("chalk");
const nodemailer = require("nodemailer");

// IMPORTING MODULES
const transporter = require("../configs/transporter");


const sendRegisterationMail = async (mail_reciever) => {
    try {

        console.log("Sending email")

        const info = await transporter.sendMail({
            from: process.env.SENDER, // sender address
            to: mail_reciever, // list of recipients
            subject: "Verification", // subject line
            text: "Please verify yourself. Your One Time Password(OTP) is 123456", // plain text body
            html: "<h1>Thank you for choosing us!!<h1>", // HTML body
        });

        console.log("Message sent: %s", info.messageId);
        // Preview URL is only available when using an Ethereal test account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        console.log(chalk.bgGreen("sent"));
        // console.log(chalk.red('mail service END'));
    } catch (err) {
        console.error("Error while sending mail:", err);
    }
}



module.exports = sendRegisterationMail;