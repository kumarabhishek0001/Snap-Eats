// GENERATE A RANDOM NUMBER(OTP)
function generateOTP(min = 1000, max = 9999) {
    return Math.floor(Math.random() * (max - min) + min)
}
// console.log(generateOTP());
module.exports = generateOTP