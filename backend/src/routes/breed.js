const express = require('express');
const BreedApi = require('../api/breed');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.post('/breed', authMiddleware(['admin']), BreedApi.createBreed);
router.put('/breed', authMiddleware(['admin']), BreedApi.updateBreed);
router.delete('/breed', authMiddleware(['admin']), BreedApi.deleteBreed);

router.get('/breed', authMiddleware(), BreedApi.findBreed);
router.get('/breeds', authMiddleware(), BreedApi.listBreeds);

module.exports = router;
