const MovieRepository = require('../repositories/MovieRepository');

class MovieService {
    constructor() {
        this.movieRepository = new MovieRepository();
    }

    async getAllMovies() {
        return await this.movieRepository.getAllMovies();
    }
}

module.exports = MovieService;