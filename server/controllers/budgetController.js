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
    budget.approvedBy = req.user.id;
    await budget.save();

    res.status(200).json({ success: true, message: 'Budget status updated', budget });
});

exports.getBudgetRequests = catchAsyncErrors(async (req, res, next) => {

    const budgets = await Budget.find().populate('requestedBy').populate('approvedBy');
    
    res.status(200).json({success: true, budgets});

});

exports.getAcceptedBudgetRequests = catchAsyncErrors(async (req, res, next) => {

  const budgets = await Budget.find({status: "Approved"}).populate('requestedBy').populate('approvedBy');
  
  res.status(200).json({success: true, budgets});

});
