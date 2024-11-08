const express = require('express');
const {
  createBudgetRequest,
  updateBudgetStatus,
  getBudgetRequests,
  getBudgetRequest,
} = require('../controllers/budgetController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/budgets', authMiddleware, createBudgetRequest); 
router.put('/budgets/:budgetId', authMiddleware, updateBudgetStatus); 
router.get('/budgets', authMiddleware, getBudgetRequests); 
router.get('/budgets/:budgetId', authMiddleware, getBudgetRequest); 

module.exports = router;
