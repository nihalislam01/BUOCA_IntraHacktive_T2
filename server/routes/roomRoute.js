

const express = require('express');
const roomController = require('../controllers/roomController');

const router = express.Router();

router.post('/', roomController.createRoom);               
router.get('/', roomController.getAllRooms);               
router.get('/:id', roomController.getRoomById);           
router.put('/:id', roomController.updateRoom);          
router.delete('/:id', roomController.deleteRoom);         
router.post('/:id/book', roomController.bookRoom);         
router.post('/:id/release', roomController.releaseRoom);   

module.exports = router;
