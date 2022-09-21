const knex = require("../db/connection");

//look at module 35.6
function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

function destroy(review_Id) {
  return knex("reviews").where({ review_Id }).del();
}

module.exports = {
  read,
  delete: destroy,
};
