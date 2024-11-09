const Budget = require('../models/budgetModel');
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


exports.createBudgetRequest = catchAsyncErrors(async (req, res, next) => {

    const { club, amountRequested, purpose } = req.body;

    const newBudget = new Budget({
      club: club,
      amountRequested,
      purpose,
      requestedBy: req.user.id,
    });

    await newBudget.save();
    res.status(201).json({success: true, newBudget});

});

exports.updateBudgetStatus = catchAsyncErrors(async (req, res, next) => {

    const { budgetId, status } = req.body;

    const budget = await Budget.findById(budgetId);

    if (!budget) {
      return next(new ErrorHandler('Budget request not found', 404));
    }

    budget.status = status;
    await budget.save();

    res.status(200).json({ success: true, message: 'Budget status updated', budget });
});

exports.getBudgetRequests = catchAsyncErrors(async (req, res, next) => {

    const budgets = await Budget.find().populate('requestedBy', 'email').populate('approvedBy', 'email');
    
    res.status(200).json({success: true, budgets});

});


exports.getBudgetRequest = catchAsyncErrors(async (req, res, next) => {

    const { budgetId } = req.params;
    const budget = await Budget.findById(budgetId).populate('requestedBy', 'email').populate('approvedBy', 'email');

    if (!budget) {
      return next(new ErrorHandler('Budget request not found', 404));
    }

    res.status(200).json({success: true, budget});

});
