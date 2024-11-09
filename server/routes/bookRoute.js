const express = require('express');
const { createBookingRequest, reviewBooking } = require('../controllers/bookController');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.post('/book-room', isAuthenticatedUser, createBookingRequest);
router.put('/update-status', isAuthenticatedUser, authorizeRoles("OCA"), reviewBooking);

module.exports = router;