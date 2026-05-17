const { registerController, loginController } = require('../controllers/authController');


const express = require('express');
const router = express.Router();

// AUTHENTICATION ROUTES

// REGISTER USER || POST
router.post('/register', registerController);

// LOGIN USER || POST
router.post('/login', loginController);

module.exports = router;