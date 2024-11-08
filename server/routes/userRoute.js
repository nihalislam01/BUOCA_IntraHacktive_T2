const express = require('express');
const { register, get, getAll, updatePassword, login, check, logout } = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.post('/register', register);
router.get('/get', isAuthenticatedUser, get);
router.get('/get/all', isAuthenticatedUser, authorizeRoles("admin"), getAll);
router.patch('/update/password', updatePassword);
router.post('/login', login);
router.get('/check', isAuthenticatedUser, check);
router.post('/logout', logout);

module.exports = router;