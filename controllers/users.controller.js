const { default: mongoose } = require("mongoose");
const userModel = require("../models/userModel");
const generateOTP = require("../utils/generateOTP");
const { sendPasswordResetMail } = require("../service/sendMail");

const chalk = require("chalk");
const bcrypt = require("bcrypt");

const getUser = async (req, res) => {

    try {

        const user = await userModel.findById({ _id: req.id });
        res.send(user);

    } catch (error) {
        console.log(chalk.bgRed("Error in admin test"));
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "INTERNAL SERVER ERROR",
            message: "Please try again after some time"
        })
    }
}

const updateUserController = async (req, res) => {

    try {

        const userId = req.id;

        const user = await userModel.findById({ _id: userId });

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "RESOURCE NOT FOUND",
                message: "user does not exist"
            })
        }

        const { username = null, email = null, address = null, userType = null, profile = null } = req.body;

        if (username) user.username = username;
        if (email) user.email = email;
        if (address) user.address = address;
        if (profile) user.profile = profile;

        await user.save();

        // delete properites -> METHOD-1
        // creates a separate instance
        // basically a copy BUT WITH A DIFFERENT REFERNCE
        // safe user and user are not attached anymore

        // const safeUser = user.toObject();

        // delete safeUser.password;
        // delete safeUser._id;

        // delete properites -> METHOD-2
        const { password, _id, ...safeUser } = user.toObject();

        res.status(200).json({
            success: true,
            message: "user updated successfully",
            user: safeUser
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "INTERNAL SERVER ERROR",
            message: "Please try again after some time"
        })
    }
}

const updateUserPassword = async (req, res) => {

    try {
        const userId = req.id;

        const user = await userModel.findById(userId);

        if (!user) {

            return res.status(500).json({
                success: false,
                error: "RESOURCE NOT FOUND",
                message: "user does not exist"
            })

        }

        const { currentPassword, newPassword } = req.body;
        const isMatch = await bcrypt.compare(currentPassword, user.password);


        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: "UNAUTHORIZED",
                message: "wrong credentials"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "password updated successfully"
        });

    } catch (error) {
        console.log(chalk.bgRed("Update password controller"));
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "INTERNAL SERVER ERROR",
            message: "Please try again after some time"
        })
    }
}

const forgetPasswordController = async (req, res) => {

    try {

        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                error: "BAD REQUEST",
                message: "all fields are mandatory"
            })

        }
        const user = await userModel.findOne({ email });

        if (user) {

            const otp = generateOTP();
            console.log(chalk.yellow("otp: ", otp));

            const salt = await bcrypt.genSalt(10);
            const hashedOTP = await bcrypt.hash(String(otp), salt);

            user.resetPasswordOTP = hashedOTP;
            await user.save();

            await sendPasswordResetMail(email, otp);

        }



        res.status(200).json({
            success: true,
            message: "If your email is registered. You will get otp"
        })


    } catch (error) {

        console.log(chalk.bgRed("forgot password controller error"));
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "INTERNAL SERVER ERROR",
            message: "Please try again after some time"
        })

    }
}



module.exports = { getUser, updateUserController, updateUserPassword, forgetPasswordController, };