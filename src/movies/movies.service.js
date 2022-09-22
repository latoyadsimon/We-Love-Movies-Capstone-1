//the service file is where the logic goes to make the controllers work for the user
//service file talks to the database, the controller talks to the frontend

const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

// const addCritic = mapProperties({
//   critic_id: "critic.critic_id",
//   preferred_name: "critic.preferred_name",
//   surname: "critic.surname",
//   organization_name: "critic.organization_name",
// });

const addCritic = mapProperties({
  // critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});

function list() {
  return knex("movies").select("*");
}

function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

function listIsShowing() {
  return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .select("m.*")
    .where({ "mt.is_showing": true })
    .groupBy("m.movie_id");
  //.distinct("m.movie_id");//this or groupBy will make sure only one movie shows.
}

function listAllTheaters(movieId) {
  return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select("t.*", "m.movie_id")
    .where({ "m.movie_id": movieId });
}

// function listReviewsAndCritics(movieId) {
//   return knex("movies as m")
//     .join("reviews as r", "r.movie_id", "m.movie_id")
//     .join("critics as c", "c.critic_id", "r.critic_id")
//     .select("r.*", "c.*", "m.movie_id")
//     .where({ "m.movie_id": movieId })
//     .first()
//     .then(addCritic); /////////////
// }

//map properties made an object, then we mapped through it.
function listReviewsAndCritics(movieId) {
  return (
    knex("reviews as r")
      .join("critics as c", "c.critic_id", "r.critic_id")
      .select("*")
      .where({ "r.movie_id": movieId })
      //.first()
      .then((data) => data.map(addCritic))
  );
}

module.exports = {
  list,
  listIsShowing,
  read,
  listAllTheaters,
  listReviewsAndCritics,
};
