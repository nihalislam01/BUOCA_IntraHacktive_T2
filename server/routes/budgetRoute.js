const express = require('express');
const {createBudgetRequest, updateBudgetStatus, getBudgetRequests, getBudgetRequest} = require('../controllers/budgetController');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();


router.post('/budgets', isAuthenticatedUser, createBudgetRequest); 
router.put('/budgets', isAuthenticatedUser, authorizeRoles('OCA'), updateBudgetStatus); 
router.get('/budgets', isAuthenticatedUser, getBudgetRequests); 
router.get('/budgets/:budgetId', isAuthenticatedUser, getBudgetRequest); 

module.exports = router;
