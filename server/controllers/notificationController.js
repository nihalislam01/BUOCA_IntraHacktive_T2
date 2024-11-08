const Notification = require('../models/notificationModel');


exports.createNotification = async (req, res) => {
  try {
    const { message, recipient } = req.body;
    const notification = new Notification({
      message,
      recipient
    });

    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id }).sort({ date: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const notification = await Notification.findById(notificationId);

    if (!notification || notification.recipient.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Notification not found or access denied' });
    }

    notification.read = true;
    await notification.save();
    res.status(200).json({ message: 'Notification marked as read', notification });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const notification = await Notification.findById(notificationId);

    if (!notification || notification.recipient.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Notification not found or access denied' });
    }

    await notification.remove();
    res.status(200).json({ message: 'Notification deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
