const Event = require('../models/eventModel');
const ErrorHandler = require('../utils/errorhandler');


exports.createEvent = catchAsyncErrors(async (req, res, next) => {

  const { name, description, eventDate, clubId } = req.body;

  const newEvent = new Event({
    name,
    description,
    eventDate,
    requestedBy: req.user.id,
  });

  await newEvent.save();
  res.status(201).json(newEvent);
  
});


exports.updateEventStatus = catchAsyncErrors(async (req, res) => {

    const { eventId, status } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return next(new ErrorHandler('Event not found', 404));
    }

    event.status = status;
    event.approvedBy = req.user.id;
    await event.save();

    res.status(200).json({ success: true, message: `Event ${status}`, event });

});


exports.getEvents = catchAsyncErrors(async (req, res) => {

  const events = await Event.find();

  res.status(200).json(events);

});

