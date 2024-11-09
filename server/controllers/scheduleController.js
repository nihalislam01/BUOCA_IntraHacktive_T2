const mongoose = require('mongoose');
const Schedule = require('../models/scheduleModel');
const Room = require('../models/roomModel');
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.getScheduleForDate = catchAsyncErrors(async (req, res, next) => {

        const { date, time } = req.body;

        if (time < 0 || time > 7) {
            return next(new ErrorHandler("Schedule time is not valid.", 400));
        }

        const selectedDate = new Date(date);
        selectedDate.setHours(0, 0, 0, 0);

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const oneMonthFromNow = new Date();
        oneMonthFromNow.setMonth(currentDate.getMonth() + 1);
        oneMonthFromNow.setHours(0, 0, 0, 0);

        if (selectedDate < currentDate || selectedDate > oneMonthFromNow) {
            return next(new ErrorHandler("Cannot book rooms at this day.", 400));
        }

        let schedules = await Schedule.find({ date: date }).populate("room");

        if (schedules.length === 0) {
            const rooms = await Room.find();
            const scheduleDocs = rooms.map(room => ({
                date: date,
                schedules: "00000000",
                room: room._id
            }));
            schedules = await Schedule.insertMany(scheduleDocs);
            schedules = await Schedule.find({ _id: { $in: schedules.map(s => s._id) } }).populate('room');
        }

        const availableRooms = schedules.filter(schedule => 
            schedule.schedules[time] === '0'
        ).map(schedule => schedule.room);

        res.status(200).json({ success: true, date: date, time: time, rooms: availableRooms });

});