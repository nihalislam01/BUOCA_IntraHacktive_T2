const express = require('express');
const { createEvent, updateEventStatus, getEvents } = require('../controllers/eventController');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();


router.post('/events', isAuthenticatedUser, createEvent); 
router.put('/events', isAuthenticatedUser, authorizeRoles('OCA'), updateEventStatus); 
router.get('/events', isAuthenticatedUser, getEvents); 

module.exports = router;
