const MovieService = require('../services/MovieService');
const { NotFoundError, BadRequestError } = require('../errors');

class MovieController {
    constructor() {
        this.movieService = new MovieService();
    }

    async search(req, res) {
        try {
            const { title, year, type, actor, director} = req.query; // Express.js automatically parses query parameters with the .query property
            const movies = await this.movieService.searchMovies(title, year, type, actor, director);
            res.json(movies);
        } catch (error) {
            if ( error instanceof NotFoundError || error instanceof BadRequestError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    }
}

module.exports = MovieController;