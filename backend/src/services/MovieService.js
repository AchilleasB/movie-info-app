const MovieRepository = require('../repositories/MovieRepository');
const { NotFoundError, BadRequestError } = require('../errors');

class MovieService {
    constructor() {
        this.movieRepository = new MovieRepository();
    }

    async searchMovies(title, year, type, actor, director) {

        // validate inputs
        this.isValidTitle(title);
        this.isValidYear(year);
        this.isValidActorOrDirector(actor, 'actors');
        this.isValidActorOrDirector(director, 'director');

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
            filteredMovies = this.filterByYearInput(movies, year)
        }
        // filter movies by actor
        if (actor) {
            filteredMovies = this.filterByActorInput(movies, actor);
        }
        // filter movies by director
        if (director) {
            filteredMovies = this.filterByDirectorInput(movies, director);
        }

        return filteredMovies;

    }

    filterByYearInput(movies, year) {
        const filteredMoviesByYear = movies.filter(movie => movie.year === String(year));
        console.log('Filtered by year:', filteredMoviesByYear);
        if (!filteredMoviesByYear || filteredMoviesByYear.length === 0) {
            throw new NotFoundError(`No movies found in year "${year}"`);
        }
        return filteredMoviesByYear;
    }

    filterByActorInput(movies, actor) {
        const filteredMoviesByActor = movies.filter(movie => movie.actors.toLowerCase().includes(actor.toLowerCase()));
        console.log('Filtered by actor:', filteredMoviesByActor);
        if (!filteredMoviesByActor || filteredMoviesByActor.length === 0) {
            throw new NotFoundError(`No movies found with actor "${actor}"`);
        }
        return filteredMoviesByActor;
    }

    filterByDirectorInput(movies, director) {
        const filteredMoviesByDirector = movies.filter(movie => movie.director.toLowerCase().includes(director.toLowerCase()));
        console.log('Filtered by director:', filteredMoviesByDirector);
        if (!filteredMoviesByDirector || filteredMoviesByDirector.length === 0) {
            throw new NotFoundError(`No movies found with director "${director}"`);
        }
        return filteredMoviesByDirector;
    }

    isValidTitle(title) {
        if (!title) {
            throw new BadRequestError('You must provide at least a title to search for movies.');
        }
        if (title.length < 3 || title.length > 30) {
            throw new BadRequestError('Title must be between 3 and 30 characters');
        }
        return true;
    }

    isValidYear(year) {
        if (year && (!/^\d{4}$/.test(year))) {
            throw new BadRequestError('Year must be a 4 digit number');
        }
        return true;
    }

    isValidActorOrDirector(name, type) {
        if (name && (name.length < 3 || name.length > 30)) {
            throw new BadRequestError(`${type} must be between 3 and 30 characters`);
        }
        if (name && !/^[a-zA-Z\s]*$/.test(name)) {
            throw new BadRequestError(`${type} must contain only letters and spaces`);
        }
        return true;
    }

}

module.exports = MovieService;