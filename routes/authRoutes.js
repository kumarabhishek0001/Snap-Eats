const { registerController, loginController, verifyUserController } = require('../controllers/authController');


const express = require('express');
const router = express.Router();

// AUTHENTICATION ROUTES

// REGISTER USER || POST
router.post('/register', registerController);

// VERIFY USER || POST
router.post('/verify', verifyUserController)

// LOGIN USER || POST
router.post('/login', loginController);

module.exports = router;