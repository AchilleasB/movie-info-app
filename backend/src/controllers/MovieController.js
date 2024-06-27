const MovieService = require('../services/MovieService');

class MovieController {
    constructor() {
        this.movieService = new MovieService();
    }

    async getAll(req, res) {
        try {
            const movies = await this.movieService.getAllMovies();
            res.json(movies);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = MovieController;