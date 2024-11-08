const express = require('express');
const {createClub, addMember, removeMember, getClub, getClubs} = require('../controllers/clubController');

const router = express.Router();


router.post('/clubs', createClub); 
router.post('/clubs/:clubId/members/:memberId', addMember); 
router.delete('/clubs/:clubId/members/:memberId', removeMember); 
router.get('/clubs/:clubId', getClub); 
router.get('/clubs', getClubs); 

module.exports = router;
