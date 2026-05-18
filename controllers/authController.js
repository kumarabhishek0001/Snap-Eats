const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');


const userModel = require("../models/userModel");
const { sendRegisterationMail, sendVerifiedMail } = require("../service/sendMail");



const chalk = require("chalk");
const generateOTP = require('../utils/generateOTP');


const registerController = async (req, res) => {


    try {

        const { username, email, password, address, userType, profile } = req.body;
        // console.log(chalk.red('user input check: ', username))

        // VALIDATION
        if (!username || !email || !password || !address || !userType || !profile) {
            return res.status(400).json({
                success: false,
                "error": "BAD REQUEST",
                message: "All fields are required"
            })
        }

        // CHECK IF USER EXISTS
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                "error": "CONFLICT",
                message: "User already exist"
            })
        }

        let salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // GENERATE OTP
        const otp = generateOTP();
        console.log(chalk.yellow(`OTP: ${otp}`));

        // HASHING OTP
        salt = await bcrypt.genSalt(10);
        const hashedOTP = await bcrypt.hash(String(otp), salt)

        const user = await userModel.create({
            username,
            email,
            password: hashedPassword,
            address,
            userType,
            profile,
            verificationOTP: hashedOTP
        })

        // SEND VERIFICATION EMAIL
        sendRegisterationMail(email, otp);

        res.status(201).json({
            success: true,
            message: "User created successfully. Please open you registered mail and verify"
        })


    } catch (error) {
        console.log(chalk.bgRed('Regiser Controller Error'));
        console.log(error);

        return res.status(500).json({
            success: false,
            "error": "Internal server error",
            message: "Please try again after sometime"
        })
    }


}

const verifyUserController = async (req, res) => {


    try {

        const { email, password, otp } = req.body;

        // VALIDATION
        if (!email || !password || !otp) {
            return res.status(400).json({
                success: false,
                error: "BAD REQUEST",
                message: "All fields are required"
            })
        }

        // GET USER
        const user = await userModel.findOne({ email });
        // console.log(chalk.yellow("user: "), user)

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "RESOURCE NOT FOUND",
                message: "Invalid credentials"
            })
        };
        // console.log(chalk.yellow("password: ", password, "ecrypted: ", user.password))
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: "UNAUTHORIZED",
                message: "Invalid credentials"
            })
        };
        // console.log(chalk.yellow("otp: ", otp, "encrypted: ", user.verificationOTP))
        const isOTPMatch = await bcrypt.compare(String(otp), user.verificationOTP)

        if (!isOTPMatch) {
            return res.status(401).json({
                success: false,
                error: "UNAUTHORIZED",
                message: "Invalid credentials"
            })
        }

        // UPDATE THE DB
        user.isVerified = true;
        user.verificationOTP = undefined;

        const recipient_email = user.email;
        await user.save();

        sendVerifiedMail(recipient_email);


        res.status(200).json({
            success: true,
            message: "User verified successfully"
        })

    } catch (error) {
        console.log(chalk.bgRed("Error in verify User"));
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "INTERNAL SERVER ERROR",
            message: "Please try again after some time"
        })
    }



}

const loginController = async (req, res) => {


    try {

        const { username, password } = req.body;
        console.log("username: ", username);
        console.log("password: ", password);

        // VALIDATION
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                error: "BAD REQUEST",
                message: "All fields are required"
            })
        }


        const user = await userModel.findOne({ username });

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "NOT FOUND",
                message: "user does not exist"
            });
        };

        console.log(chalk.green(user._id));


        // VERIFY USER PASSWORD
        const isMatch = await bcrypt.compare(password, user.password)
        // console.log(isMatch);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: "UNAUTHORIZED",
                message: "incorrect credentials"
            });
        }

        const token = JWT.sign({
            id: user._id
        }, process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        )

        res.status(200).json({
            success: true,
            message: "user logged in",
            token
        })

    } catch (error) {
        console.log(chalk.bgRed("login controller error"));
        console.log(error);

        return res.status(500).json({
            success: false,
            error: "INTERNAL SERVER ERROR",
            message: "Please try again after some time."
        })

    }

};


module.exports = { registerController, loginController, verifyUserController }