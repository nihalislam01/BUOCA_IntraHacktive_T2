const express = require('express');
const {getScheduleForDate} = require('../controllers/scheduleController');
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();
             
router.post('/schedules', isAuthenticatedUser, getScheduleForDate);               

module.exports = router;
