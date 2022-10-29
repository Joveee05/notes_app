const express = require('express');
const noteController = require('../controllers/noteController');
const authController = require('../controllers/authentication');

const router = express.Router();

router.use(authController.protect);

router.get('/', noteController.getAllNotes);

router.get('/myNotes', noteController.getMyNotes);

router.post('/new-note', noteController.createNote);

router.get('/search', noteController.searchNote);

router.put('/favourite', noteController.favouriteNote);

router.put('/removefavourite', noteController.removeFavourite);

router
  .route('/:id')
  .get(noteController.getNote)
  .patch(noteController.editNote)
  .delete(noteController.deleteNote);

module.exports = router;
