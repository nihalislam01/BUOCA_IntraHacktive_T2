const express = require('express');
const { createEvent, updateEventStatus, getEvents } = require('../controllers/eventController');
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();


router.post('/events', isAuthenticatedUser, createEvent); 
router.put('/events', isAuthenticatedUser, updateEventStatus); 
router.get('/events', isAuthenticatedUser, getEvents); 

module.exports = router;
