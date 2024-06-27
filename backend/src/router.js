const express = require('express');
const MovieController = require('./controllers/MovieController');
const router = express.Router();

const movieController = new MovieController();

router.get('/movies', (req, res) => movieController.getAll(req, res));

module.exports = router;