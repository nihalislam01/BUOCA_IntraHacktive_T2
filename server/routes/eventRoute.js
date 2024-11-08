const express = require('express');
const { createEvent, updateEventStatus, getEvents } = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/events', authMiddleware, createEvent); 
router.put('/events/:eventId/status', authMiddleware, updateEventStatus); 
router.get('/events', authMiddleware, getEvents); 

module.exports = router;
