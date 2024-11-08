const express = require('express');
const {
  createClub,
  addMember,
  removeMember,
  getClub,
  getClubs,
} = require('../controllers/clubController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/clubs', authMiddleware, createClub); 
router.post('/clubs/:clubId/members/:memberId', authMiddleware, addMember); 
router.delete('/clubs/:clubId/members/:memberId', authMiddleware, removeMember); 
router.get('/clubs/:clubId', authMiddleware, getClub); 
router.get('/clubs', authMiddleware, getClubs); 

module.exports = router;
