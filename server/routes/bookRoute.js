const express = require('express');
const { createBookingRequest, reviewBooking, getBookRequests, getAllBookRequests } = require('../controllers/bookController');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.post('/book-room', isAuthenticatedUser, createBookingRequest);
router.put('/update-status', isAuthenticatedUser, authorizeRoles("OCA"), reviewBooking);
router.get('/get', isAuthenticatedUser, getBookRequests);
router.get('/get/all', isAuthenticatedUser, getAllBookRequests);

module.exports = router;