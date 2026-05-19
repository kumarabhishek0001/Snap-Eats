const express = require('express');
const { getUser, updateUserController, updateUserPassword, forgetPasswordController } = require('../controllers/users.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// GET USER DETAILS || GET
router.get('/getUser', authMiddleware, getUser);

// UPDATE USER || PUT
router.put('/updateUser', authMiddleware, updateUserController)


// UPDATE PASSWORD || PUT
router.put('/updatePassword', authMiddleware, updateUserPassword);

// FORGOT PASSWORD PASSWORD || POST
router.post('/forgetPassword', forgetPasswordController);



module.exports = router;