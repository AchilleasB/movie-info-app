const axios = require('axios');
const dotenv = require('dotenv')
dotenv.config()
const Movie = require('../models/Movie');

class MovieRepository {
    constructor() {
        this.apiUrl = process.env.OMDB_API_URL;
        // console.log(this.apiUrl)
        this.apiKey = process.env.OMDB_API_KEY;
        // console.log(this.apiKey)
    }

    async getAllMovies() {
        try {
            console.log('Attempting to fetch movies from OMDb API...');
            const response = await axios.get(`${this.apiUrl}?apikey=${this.apiKey}&s=movie`);
            console.log('Received response from OMDb API:');
            console.log(response.data);

            if (response.data.Response === 'False') {
                throw new Error(response.data.Error);
            }
            return response.data.Search.map(movieData => new Movie(movieData));
        } catch (error) {
            console.error(`Error fetching data from OMDb API: ${error.message}`);
            throw new Error(`Failed to fetch data from OMDb API: ${error.message}`);
        }
    }
}

module.exports = MovieRepository;