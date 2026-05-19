const JWT = require('jsonwebtoken');
const chalk = require('chalk');

const authMiddleware = async (req, res, next) => {

    try {
        const authHeader = req.headers["authorization"]

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                error: "UNAUTHORIZED",
                message: "no token provided"
            })
        }

        const parts = authHeader.split(" ");

        if (parts.length !== 2 || parts[0] !== "Bearer") {
            return res.status(401).json({
                success: false,
                error: "UNAUTHORIZED",
                message: "Invalid authorization format"
            });
        }

        const token = parts[1];

        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    error: "UNAUTHORIZED",
                    message: "malformed token"
                })
            } else {
                // console.log(decode)
                req.id = decode.id;
                next();
            }
        })
    } catch (error) {
        console.log(chalk.bgRed("Error in auth middleware"));
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "INTERNAL SERVER ERROR",
            message: "Please try again after some time"
        })
    }
}

module.exports = authMiddleware