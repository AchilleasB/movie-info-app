const axios = require('axios');
const dotenv = require('dotenv')
dotenv.config()
const Movie = require('../models/Movie');

class MovieRepository {
    constructor() {
        this.apiKey = process.env.OMDB_API_KEY;
        this.apiUrl = `${process.env.OMDB_API_URL}?apikey=${this.apiKey}`;
    }

    // OMDB API handles the search by title and returns a list of movies
    async fetchByTitle(title) {
        try {
            let url = `${this.apiUrl}&s=${encodeURIComponent(title)}`;
            
            const response = await axios.get(url);

            if (response.data.Response === 'False') {
                throw new Error(response.data.Error);
            }

            const moviesDetails = response.data.Search.map(movieData => this.fetchMovieDetails(movieData.imdbID));
            const movies = await Promise.all(moviesDetails);

            return movies;
        } catch (error) {
            throw new Error(`Failed to fetch any movies: ${error.message}`);
        }
    }

    // OMDB API handles the search by IMDB ID and returns a single movie
    async fetchMovieDetails(imdbID) {
        try {
            const url = `${this.apiUrl}&i=${imdbID}`;
            const response = await axios.get(url);

            if (response.data.Response === 'False') {
                throw new Error(response.data.Error);
            }

            const movie = new Movie(response.data);
            return movie;
        } catch (error) {
            throw new Error(`Failed to fetch movie details: ${error.message}`);
        }
    }

    // OMDB API struggles with searching by other parameters
    // therefore filtering is done in the service layer
}

module.exports = MovieRepository;