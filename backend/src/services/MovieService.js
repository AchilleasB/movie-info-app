const MovieRepository = require('../repositories/MovieRepository');
const { NotFoundError, BadRequestError } = require('../errors');

class MovieService {
    constructor() {
        this.movieRepository = new MovieRepository();
    }

    async searchMovies(title, year, type, actor, director) {
        if (!title) {
            throw new BadRequestError('You must provide at least a title to search for movies');
        }

        // fetch db objects by title
        const jsonObjects = await this.movieRepository.fetchByTitle(title);
        if (!jsonObjects || jsonObjects.length === 0) {
            throw new NotFoundError('No data found');
        }

        // filter objects by movie type and store into movies array
        // due to db containing pc and playstation games with the same title
        const movies = jsonObjects.filter(movie => movie.type === type);
        if (!movies || movies.length === 0) {
            throw new NotFoundError('No movies found');
        }
        console.log('Movies fetched by title:', movies);

        let filteredMovies = movies;
        // filter movies by year
        if (year) {
            filteredMovies = this.handleYearInput(movies, year)
        }
        // filter movies by actor
        if (actor) {
            filteredMovies = this.handleActorInput(movies, actor);
        }
        // filter movies by director
        if (director) {
            filteredMovies = this.handleDirectorInput(movies, director);
        }

        return filteredMovies;
    }

    handleYearInput(movies, year) {
        const filteredMoviesByYear = movies.filter(movie => movie.year === String(year));
        console.log('Filtered by year:', filteredMoviesByYear);
        if (!filteredMoviesByYear || filteredMoviesByYear.length === 0) {
            throw new NotFoundError(`No movies found in year "${year}"`);
        }
        return filteredMoviesByYear;
    }

    handleActorInput(movies, actor) {
        const filteredMoviesByActor = movies.filter(movie => movie.actors.toLowerCase().includes(actor.toLowerCase()));
        console.log('Filtered by actor:', filteredMoviesByActor);
        if (!filteredMoviesByActor || filteredMoviesByActor.length === 0) {
            throw new NotFoundError(`No movies found with actor "${actor}"`);
        }
        return filteredMoviesByActor;
    }

    handleDirectorInput(movies, director) {
        const filteredMoviesByDirector = movies.filter(movie => movie.director.toLowerCase().includes(director.toLowerCase()));
        console.log('Filtered by director:', filteredMoviesByDirector);
        if (!filteredMoviesByDirector || filteredMoviesByDirector.length === 0) {
            throw new NotFoundError(`No movies found with director "${director}"`);
        }
        return filteredMoviesByDirector;
    }

}

module.exports = MovieService;