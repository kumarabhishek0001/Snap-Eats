const mongoose = require('mongoose');
const chalk = require('chalk');

const connectDb = async () => {

    try {
        const connection = await mongoose.connect(process.env.MONGOOSE_URL);
        console.log(chalk.bgWhite("successfully connected to db: ", mongoose.connection.host));

    } catch (error) {
        console.log(chalk.bgMagenta('Error connecting to db'));
        console.log(error);
    }
}

module.exports = connectDb;