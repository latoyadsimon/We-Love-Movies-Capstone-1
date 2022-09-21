const knex = require("../db/connection");
// const mapProperties = require("../utils/map-properties");

const reduceProperties = require("../utils/reduce-properties");
// function list() {
//   return knex("theaters").select("*");
// }// a normal list function

// const addMovies = mapProperties({
//   movie_id: "movies.movie_id",
//   title: "movies.title",
//   runtime_in_minutes: "movies.runtime_in_minutes",
//   rating: "movies.rating",
//   description: "movies.description",
//   image_url: "movies.image_url",
//   is_showing: "movies.is_showing",
//   theater_id: "theater_id",
// });

//reduce properties returns a function that needs data passed into it, you have to make that data object that has key value pairs. All the values should be arrays. (the variable (addMovies) that you made is now a function)
const addMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
  is_showing: ["movies", null, "is_showing"],
  // theater_id: ["movies", null, "theater_id"],
  created_at: ["movies", null, "created_at"],
  updated_at: ["movies", null, "updated_at"],
});

// function list() {
//   return knex("theaters  as t")
//     .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
//     .join("movies as m", "m.movie_id", "mt.movie_id")
//     .select("t.*", "m.*", "mt.is_showing")
//     .then((data) => data.map(addMovies));
// }//this one uses map properties, but the movies only has one movie and returns an object in movies instead of an array

function list() {
  return (
    knex("theaters  as t")
      .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
      .join("movies as m", "m.movie_id", "mt.movie_id")
      .select("t.*", "m.*", "mt.is_showing")
      //.then((data) => data.map(addMovies));// addMovies is a function so it can't work with map.
      .then((data) => addMovies(data)) // data needs to be passed into the newly created function
  );
}

module.exports = {
  list,
};
