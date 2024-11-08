const Budget = require('../models/Budget');
const Club = require('../models/Club');


exports.createBudgetRequest = async (req, res) => {
  try {
    if (req.user.role !== 'Organizer') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { clubId, amountRequested } = req.body;

    const club = await Club.findById(clubId);
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    const newBudget = new Budget({
      club: clubId,
      amountRequested,
      requestedBy: req.user._id,
    });

    await newBudget.save();
    res.status(201).json(newBudget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBudgetStatus = async (req, res) => {
  try {
    if (req.user.role !== 'OCA') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { budgetId } = req.params;
    const { status, comments } = req.body;

    if (!['Approved', 'Denied'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const budget = await Budget.findById(budgetId);
    if (!budget) {
      return res.status(404).json({ message: 'Budget request not found' });
    }

    budget.status = status;
    budget.comments = comments || '';
    await budget.save();

    res.status(200).json({ message: 'Budget status updated', budget });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBudgetRequests = async (req, res) => {
  try {
    const filter = req.user.role === 'Organizer' ? { requestedBy: req.user._id } : {};
    const budgets = await Budget.find(filter).populate('club', 'name').populate('requestedBy', 'username role');
    
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getBudgetRequest = async (req, res) => {
  try {
    const { budgetId } = req.params;
    const budget = await Budget.findById(budgetId).populate('club', 'name').populate('requestedBy', 'username role');

    if (!budget) {
      return res.status(404).json({ message: 'Budget request not found' });
    }

    if (req.user.role === 'Organizer' && budget.requestedBy._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
