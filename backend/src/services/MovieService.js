const MovieRepository = require('../repositories/MovieRepository');

class MovieService {
    constructor() {
        this.movieRepository = new MovieRepository();
    }

    async searchMovies(title, year) {
        if (title) {
            const movies = await this.movieRepository.fetchByTitle(title);
            console.log('Movies fetched by title:', movies);
            
            let filteredMovies = movies;

            if (year) {
                filteredMovies = movies.filter(movie => movie.year === String(year));
                console.log('Filtered by year:', filteredMovies);
            }

            return filteredMovies;
        } else {
            throw new Error('You must provide at least a title to search for movies');
        }
    }
}

module.exports = MovieService;