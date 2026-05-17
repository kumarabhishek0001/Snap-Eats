const chalk = require("chalk");
const userModel = require("../models/userModel");

const registerController = async (req, res) => {


    try {

        const { username, email, password, address, userType, profile } = req.body;

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

        const user = await userModel.create({
            username,
            email,
            password,
            address,
            userType,
            profile
        })

        res.status(201).json({
            success: true,
            message: "user created successfully"
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

module.exports = { registerController }