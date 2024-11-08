const express = require('express');
const { createEvent, updateEventStatus, getEvents } = require('../controllers/eventController');

const router = express.Router();


router.post('/events', createEvent); 
router.put('/events/:eventId/status', updateEventStatus); 
router.get('/events', getEvents); 

module.exports = router;
