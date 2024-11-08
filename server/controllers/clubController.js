const Club = require('../models/Club');
const User = require('../models/User');


exports.createClub = async (req, res) => {
  try {
    if (req.user.role !== 'OCA') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { name, description } = req.body;

    const newClub = new Club({
      name,
      description,
      createdBy: req.user._id,
    });

    await newClub.save();
    res.status(201).json(newClub);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.addMember = async (req, res) => {
  try {
    if (req.user.role !== 'OCA') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { clubId, memberId } = req.params;
    const club = await Club.findById(clubId);

    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    if (!club.members.includes(memberId)) {
      club.members.push(memberId);
      await club.save();
    }

    res.status(200).json({ message: 'Member added', club });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.removeMember = async (req, res) => {
  try {
    if (req.user.role !== 'OCA') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { clubId, memberId } = req.params;
    const club = await Club.findById(clubId);

    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    club.members = club.members.filter(id => id.toString() !== memberId);
    await club.save();

    res.status(200).json({ message: 'Member removed', club });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getClub = async (req, res) => {
  try {
    const { clubId } = req.params;
    const club = await Club.findById(clubId).populate('members', 'username role');

    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    res.status(200).json(club);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getClubs = async (req, res) => {
  try {
    const clubs = await Club.find().populate('members', 'username role');
    res.status(200).json(clubs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
