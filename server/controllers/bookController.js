const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Book = require("../models/bookModel");
const Schedule = require('../models/scheduleModel');

exports.createBookingRequest = catchAsyncErrors(async (req, res, next) => {
        const { purpose, rooms } = req.body;

        for (const roomBooking of rooms) {
            const { date, room, timeSlotIndices } = roomBooking;

            const schedule = await Schedule.findOne({ date, room });

            if (!schedule) {
                return next(new ErrorHandler("No schedule found for the specified date and room.", 404));
            }

            let updatedSchedule = schedule.schedules.split('');
            timeSlotIndices.forEach(index => {
                if (updatedSchedule[index] === '0') {
                    updatedSchedule[index] = '1';
                } else {
                    return next(new ErrorHandler(`Slot ${index} is already booked or pending.`, 400));
                }
            });

            schedule.schedules = updatedSchedule.join('');
            await schedule.save();
        }

        const newBooking = new Book({
            purpose,
            bookedBy: req.user.id,
            rooms: rooms.map(roomBooking => ({
                date: roomBooking.date,
                schedule: roomBooking.timeSlotIndices.join(''),
                room: roomBooking.room
            }))
        });

        await newBooking.save();
        res.status(201).json({ success: true, message: "Booking request created successfully", booking: newBooking });
});

exports.reviewBooking = catchAsyncErrors(async (req, res, next) => {

        const { bookingId, status } = req.body;

        if (!['Approved', 'Denied'].includes(status)) {
            return next(new ErrorHandler("Status must be either 'Approved' or 'Denied'.", 400));
        }

        const booking = await Book.findById(bookingId);

        if (!booking) {
            return next(new ErrorHandler("Booking not found.", 404));
        }

        if (status === 'Denied') {
            for (const roomBooking of booking.rooms) {
                const { date, room, schedule } = roomBooking;


                const scheduleDoc = await Schedule.findOne({ date, room });

                if (!scheduleDoc) {
                    return next(new ErrorHandler(`No schedule found for the room ${room} on ${date}.`, 404));
                }

                let updatedSchedule = scheduleDoc.schedules.split('');
                for (const index of schedule.split('')) {
                    const slotIndex = parseInt(index);
                    updatedSchedule[slotIndex] = '0';
                }
                scheduleDoc.schedules = updatedSchedule.join('');
                await scheduleDoc.save();
            }
        }

        booking.status = status;
        booking.approvedBy = req.user.id;
        await booking.save();

        res.status(200).json({ success: true, message: `Booking ${status.toLowerCase()} successfully`, booking });

});

exports.getBookRequests =catchAsyncErrors(async (req, res, next) => {

    const requests = await Book.find({status: "Pending"}).populate("rooms.room").populate('bookedBy', 'email').populate('approvedBy', 'email');
    res.status(200).json({success:true, requests});

});