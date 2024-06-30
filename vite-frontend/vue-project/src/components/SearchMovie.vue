<template>
  <div class="container">
    <h1>Movie Search</h1>
    <form @submit.prevent="searchMovies" class="search-form">
      <input v-model="title" placeholder="Enter movie name (required)" class="input-field">
      <input v-model="year" placeholder="Enter year (optional)" class="input-field">
      <input v-model="actor" placeholder="Enter actor (optional)" class="input-field">
      <input v-model="director" placeholder="Enter director (optional)" class="input-field">
      <button type="submit" class="search-button">Search</button>
    </form>
    <div v-if="errorMessage" class="errorMessage">{{ errorMessage }}</div>
    <div v-if="movies.length" class="movies-container">
      <div v-for="movie in movies" :key="movie.imdbID" class="movie-card">
        <h3>{{ movie.title }} ({{ movie.year }})</h3>
        <img :src="movie.poster" :alt="movie.title" class="movie-poster">
        <h4>{{ movie.runtime }}</h4>
        <h4>Starring: {{ movie.actors }}</h4>
        <h4>By: {{ movie.director }}</h4>
        <p>{{ movie.plot }}</p>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

const API_URL = 'http://localhost:3000/api'
// This component will have a form to search for movies
// It will have a data object with title, year and movies properties
// It will have a searchMovies method that will make a GET request to the /api/movies endpoint
// It will render the search form and the search results
// The search results will be displayed as a list of movie titles and posters
// The movie posters will be displayed as images

export default {
  data() {
    return {
      title: '',
      year: '',
      actor: '',
      director: '',
      movies: [],
      errorMessage: ''
    }
  },
  methods: {
    async searchMovies() {
      try {
        const response = await axios.get(API_URL + '/movies', {
          params: {
            title: this.title,
            year: this.year,
            type: 'movie',
            actor: this.actor,
            director: this.director
          }
        });

        this.movies = response.data;

      } catch (error) {
        console.error('Error fetching movies:', error);
        this.displayError(error.response.data.error);
      }
    },

    displayError(msg) {
      this.errorMessage = msg;
      setTimeout(() => {
        this.errorMessage = '';
        this.year = '';
        this.actor = '';
        this.director = '';
        this.searchMovies();
      }, 3000);
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  font-family: Arial, sans-serif;
}

h1,
h2 {
  color: #c2c2c2;
  margin-bottom: 20px;
}

.search-form {
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.input-field {
  padding: 10px;
  width: 80%;
  max-width: 600px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search-button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-button:hover {
  background-color: #369c70;
}

.errorMessage {
  color: rgb(230, 27, 27);
  font-size: 1.2em;
  border: #666 1px solid;
  background-color: white;
  width: fit-content;
  margin: auto auto 20px auto;
  padding: 10px;
  border-radius: 4px;
}

.movies-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.movie-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  text-align: center;
  padding: 10px;
}

.movie-poster {
  max-width: 100%;
  border-radius: 4px;
}

h3 {
  margin: 10px 0;
  color: black;
}

h4 {
  margin: 10px 0;
  color: #666;
  border-bottom: #666 1px solid;
}

p {
  color: #666;
  font-size: .9em;
  margin: 10px 0;
}
</style>
