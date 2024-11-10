const express = require('express');
const { getMessage } = require('../controllers/threadController');
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.get('/:referenceId/:type', isAuthenticatedUser, getMessage);

module.exports = router;