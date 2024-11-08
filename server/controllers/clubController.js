const Club = require('../models/clubModel');
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.getClubs = catchAsyncErrors(async (req, res) => {

    const clubs = await Club.find();
    res.status(200).json({success: true, clubs});

});
