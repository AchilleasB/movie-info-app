const MovieService = require('../services/MovieService');

class MovieController {
    constructor() {
        this.movieService = new MovieService();
    }

    async search(req, res) {
        try {
            const { title, year } = req.query; // Express.js automatically parses query parameters with the .query property
            const movies = await this.movieService.searchMovies(title, year);
            res.json(movies);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = MovieController;