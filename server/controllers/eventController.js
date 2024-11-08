const Event = require('../models/eventModel');


exports.createEvent = async (req, res) => {
  try {
    const { name, description, eventDate } = req.body;
    if (req.user.role !== 'Organizer') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const newEvent = new Event({
      name,
      description,
      eventDate,
      requestedBy: req.user._id,
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateEventStatus = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { status } = req.body;

    if (req.user.role !== 'OCA') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    event.status = status;
    event.approvedBy = req.user._id;
    await event.save();

    res.status(200).json({ message: `Event ${status}`, event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getEvents = async (req, res) => {
  try {
    let events;
    if (req.user.role === 'OCA') {
      events = await Event.find().populate('requestedBy', 'username');
    } else {
      events = await Event.find({ requestedBy: req.user._id });
    }
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
