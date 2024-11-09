const express = require('express');
const {getScheduleForDate} = require('../controllers/scheduleController');

const router = express.Router();
             
router.post('/schedules', getScheduleForDate);               

module.exports = router;
