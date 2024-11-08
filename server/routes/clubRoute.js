const express = require('express');
const {getClubs} = require('../controllers/clubController');

const router = express.Router();

router.get('/clubs', getClubs); 

module.exports = router;
