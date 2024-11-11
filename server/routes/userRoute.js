const express = require('express');
const { register, get, getAll, sendVerificationEmail, verifyCallback, updatePassword, login, check, logout } = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.post('/register', isAuthenticatedUser, authorizeRoles("OCA"), register);
router.post('/verify/email', sendVerificationEmail);
router.post('/verify/otp', verifyCallback);
router.get('/get', isAuthenticatedUser, get);
router.get('/get/all', isAuthenticatedUser, authorizeRoles("OCA"), getAll);
router.patch('/update/password', updatePassword);
router.post('/login', login);
router.get('/check', isAuthenticatedUser, check);
router.post('/logout', isAuthenticatedUser, logout);

module.exports = router;