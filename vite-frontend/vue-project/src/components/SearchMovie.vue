<template>
  <div class="container">
    <h1>Movie Search</h1>
    <form @submit.prevent="searchMovies" class="search-form">
      <input v-model="title" placeholder="Enter movie name" class="input-field">
      <input v-model="year" placeholder="Enter year (optional)" class="input-field">
      <button type="submit" class="search-button">Search</button>
    </form>
    <div v-if="movies.length" class="movies-container">
      <div v-for="movie in movies" :key="movie.imdbID" class="movie-card">
        <h2>{{ movie.title }} ({{ movie.year }})</h2>
        <img :src="movie.poster" :alt="movie.title" class="movie-poster">
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

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
      movies: []
    }
  },
  methods: {
    async searchMovies() {
      try {
        const response = await axios.get('/api/movies', {
          params: {
            title: this.title,
            year: this.year || ''
          }
        });
        this.movies = response.data;
      } catch (error) {
        console.error('Error fetching movies:', error);
        alert('Error fetching movies: ' + error.message);
      }
    }
  }
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

h1 {
  color: #333;
  margin-bottom: 20px;
}

.search-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.input-field {
  padding: 10px;
  width: 80%;
  max-width: 300px;
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
  max-width: 200px;
  text-align: center;
  padding: 10px;
}

.movie-poster {
  max-width: 100%;
  border-radius: 4px;
}

h2 {
  font-size: 1.2em;
  margin: 10px 0;
}
</style>
