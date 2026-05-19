const express = require('express');
const { getUser, updateUserController, updateUserPassword, resetPasswordController } = require('../controllers/users.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// GET USER DETAILS || GET
router.get('/getUser', authMiddleware, getUser);

// UPDATE USER || PUT
router.put('/updateUser', authMiddleware, updateUserController)


// UPDATE PASSWORD || PUT
router.put('/updatePassword', authMiddleware, updateUserPassword);

// RESET PASSWORD || PUT
router.post('/resetPassword', authMiddleware, resetPasswordController)

module.exports = router;