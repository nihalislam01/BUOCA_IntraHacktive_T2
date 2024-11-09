const Room = require('../models/roomModel');


exports.createRoom = async (req, res) => {
    try {
        const newRoom = new Room(req.body);
        await newRoom.save();
        res.status(200).json({success: true, newRoom});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json({success: true, rooms});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
