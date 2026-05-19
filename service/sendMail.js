const chalk = require("chalk");
const nodemailer = require("nodemailer");

// IMPORTING MODULES
const transporter = require("../configs/transporter");


const sendRegisterationMail = async (mail_reciever, otp) => {
    try {

        console.log("Sending email")

        const info = await transporter.sendMail({
            from: process.env.SENDER, // sender address
            to: mail_reciever, // list of recipients
            subject: "Verification", // subject line
            text: "Please verify yourself. Your One Time Password(OTP) is 123456", // plain text body
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h1>Thank you for choosing us!!</h1>

                    <p>Your OTP for verification is:</p>

                    <h2 style="
                        background-color: #f4f4f4;
                        display: inline-block;
                        padding: 10px 20px;
                        border-radius: 8px;
                        letter-spacing: 3px;
                    ">
                        ${otp}
                    </h2>

                    <p>This OTP will expire in 5 minutes.</p>
                </div>
            `, // HTML body
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

const sendVerifiedMail = async (mail_reciever) => {

    try {

        console.log("Sending email")

        const info = await transporter.sendMail({
            from: process.env.SENDER, // sender address
            to: mail_reciever, // list of recipients
            subject: "Welcome Aboard", // subject line
            text: "Please verify yourself. Your One Time Password(OTP) is 123456", // plain text body
            html: `
                <div style="font-family: Arial, sans-serif; padding: 30px; background-color: #f4f7fb;">
    
    <div style="
        max-width: 500px;
        margin: auto;
        background-color: white;
        padding: 30px;
        border-radius: 12px;
        text-align: center;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    ">

        <h1 style="color: #28a745;">
            ✅ Verification Successful
        </h1>

        <p style="font-size: 16px; color: #555;">
            Your account has been successfully verified.
        </p>

        <p style="font-size: 16px; color: #555;">
            You can now access all features of our platform.
        </p>

        <div style="
            margin-top: 25px;
            padding: 15px;
            background-color: #eafaf1;
            border-radius: 8px;
            color: #28a745;
            font-weight: bold;
        ">
            Welcome aboard 🎉
        </div>

    </div>

</div>
            `, // HTML body
        });

        console.log("Message sent: %s", info.messageId);
        // Preview URL is only available when using an Ethereal test account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        console.log(chalk.bgGreen("sent"));
        // console.log(chalk.red('mail service END'));
    } catch (err) {
        console.error("Error while sending thank-you mail:", err);
    }

}


const sendPasswordResetMail = async (mail_reciever, otp) => {

    try {

        console.log("Sending email")

        const info = await transporter.sendMail({
            from: process.env.SENDER, // sender address
            to: mail_reciever, // list of recipients
            subject: "Reset Password", // subject line
            text: "Please verify yourself. Your One Time Password(OTP) is 123456", // plain text body
            html: `
                <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
  <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    
    <h2 style="color: #333333; text-align: center;">
      Forgot Password Verification
    </h2>

    <p style="color: #555555; font-size: 16px;">
      We received a request to reset your password.
    </p>

    <p style="color: #555555; font-size: 16px;">
      Use the following One-Time Password (OTP) to continue:
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <span style="display: inline-block; background-color: #007bff; color: #ffffff; padding: 15px 30px; font-size: 28px; letter-spacing: 5px; border-radius: 8px; font-weight: bold;">
        ${otp}
      </span>
    </div>

    <p style="color: #777777; font-size: 14px;">
      This OTP is valid for 10 minutes. Please do not share it with anyone.
    </p>

    <p style="color: #777777; font-size: 14px;">
      If you did not request a password reset, you can safely ignore this email.
    </p>

    <hr style="margin: 25px 0; border: none; border-top: 1px solid #dddddd;">

    <p style="text-align: center; color: #999999; font-size: 12px;">
      © 2026 Your Company. All rights reserved.
    </p>

  </div>
</div>
            `, // HTML body
        });

        console.log("Message sent: %s", info.messageId);
        // Preview URL is only available when using an Ethereal test account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        console.log(chalk.bgGreen("sent"));
        // console.log(chalk.red('mail service END'));
    } catch (err) {
        console.error("Error while sending thank-you mail:", err);
    }

}




module.exports = { sendRegisterationMail, sendVerifiedMail, sendPasswordResetMail };