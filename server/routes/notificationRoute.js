const express = require('express');
const {createNotification, getNotifications, markAsRead, deleteNotification} = require('../controllers/notificationController');

const router = express.Router();


router.post('/notifications', createNotification);
router.get('/notifications', getNotifications);
router.put('/notifications/:notificationId/read', markAsRead);
router.delete('/notifications/:notificationId', deleteNotification);

module.exports = router;
