const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required']
    },
    email: {
        type: String,
        required: [true, 'email is required']
    },
    password: {
        type: String,
        required: [true, 'passoword is required']
    },
    address: {
        type: Array,
        required: [true, 'address is required']
    },
    userType: {
        type: String,
        required: [true, 'user-type is required'],
        default: 'client',
        enum: ['client', 'admin', 'vendor', 'driver']
    },
    profile: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2yGDr34mjFWlbLRGMxLIhAoPCC5vmMvDEbVm6cSZLeNw-n0eWNj-2wls&s"
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationOTP: {
        type: String
    }

},
    {
        timestamps: true
    })


const userModel = mongoose.model('User', userSchema);
module.exports = userModel