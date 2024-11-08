const express = require('express');
const {createBudgetRequest, updateBudgetStatus, getBudgetRequests, getBudgetRequest} = require('../controllers/budgetController');

const router = express.Router();


router.post('/budgets', createBudgetRequest); 
router.put('/budgets/:budgetId', updateBudgetStatus); 
router.get('/budgets', getBudgetRequests); 
router.get('/budgets/:budgetId', getBudgetRequest); 

module.exports = router;
