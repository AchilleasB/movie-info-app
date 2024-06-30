class Movie {
    constructor({ Title, Year, Type, imdbID, Poster, Genre, Director, Actors, Plot, Runtime, Released, imdbRating }) {
        this.title = Title;
        this.year = Year;
        this.type = Type;
        this.imdbID = imdbID;
        this.poster = Poster;
        this.genre = Genre;
        this.director = Director;
        this.actors = Actors;
        this.plot = Plot;
        this.runtime = Runtime;
        this.released = Released;
        this.imdbRating = imdbRating;
    }
}

module.exports = Movie;