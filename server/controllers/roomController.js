
const Room = require('../models/RoomController');

exports.createRoom = async (req, res) => {
    try {
        const room = new Room(req.body);
        await room.save();
        res.status(201).json(room);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all rooms
exports.getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single room by ID
exports.getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update room details
exports.updateRoom = async (req, res) => {
    try {
        const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json(room);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a room
exports.deleteRoom = async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Book a room
exports.bookRoom = async (req, res) => {
    const { userId, bookingDate } = req.body;

    try {
        const room = await Room.findById(req.params.id);

        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        if (!room.isAvailable) {
            return res.status(400).json({ message: 'Room is already booked' });
        }

        // Update room status to booked
        room.isAvailable = false;
        room.bookedBy = userId;
        room.bookingDate = bookingDate;

        await room.save();
        res.status(200).json({ message: 'Room booked successfully', room });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Release a room
exports.releaseRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);

        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        // Update room status to available
        room.isAvailable = true;
        room.bookedBy = null;
        room.bookingDate = null;

        await room.save();
        res.status(200).json({ message: 'Room released successfully', room });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
