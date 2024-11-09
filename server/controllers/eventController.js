const Event = require('../models/eventModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


exports.createEvent = catchAsyncErrors(async (req, res, next) => {

  const { name, club, description, eventDate } = req.body;

  const newEvent = new Event({
    name,
    club,
    description,
    eventDate,
    requestedBy: req.user.id,
  });

  await newEvent.save();
  res.status(201).json({success: true, event: newEvent});
  
});


exports.updateEventStatus = catchAsyncErrors(async (req, res, next) => {

    const { eventId, status } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return next(new ErrorHandler('Event not found', 404));
    }

    event.status = status;
    event.aprrovedBy = req.user.id;
    await event.save();

    res.status(200).json({ success: true, message: `Event ${status}`, event });

});


exports.getEvents = catchAsyncErrors(async (req, res, next) => {

  const events = await Event.find().populate('requestedBy', 'email').populate('aprrovedBy', 'email');

  res.status(200).json({success: true, events: events});

});

