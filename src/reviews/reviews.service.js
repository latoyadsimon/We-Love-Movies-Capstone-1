const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  // critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  //   created_at: "critic.created_at",
  //   updated_at: "critic.updated_at",//the test does not ask for these
});

//look at module 35.6
function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}
// //the .first(), knex specific command, gets only the first record that matches and returns it as an object

function update(updatedReview) {
  return (
    knex("reviews")
      //.select("*")//this is redundant
      .where({ review_id: updatedReview.review_id })
      .update(updatedReview, "*")
      .then(() => {
        return (
          knex("reviews as r")
            .join("critics as c", "c.critic_id", "r.critic_id")
            .select("*")
            .where({ "r.review_id": updatedReview.review_id })
            //.first()
            .then((data) => data.map(addCritic)[0])
        );
      })
  );
}

//another way to solve the update function for reviews
// function update(updatedReview) {
//   return knex("reviews as r")
//     .select("*")
//     .where({ review_id: updatedReview.review_id })
//     .update(updatedReview, "*");
// }

// //endpoint to update and output critic data by ID
// function updateCritic(reviewId) {
//   return knex("reviews as r")
//     .join("critics as c", "r.critic_id", "c.critic_id")
//     .select("*")
//     .where({ review_id: reviewId })
//     .then((data) => data.map(addCritic));
// }

function destroy(review_Id) {
  return knex("reviews").where({ review_Id }).del();
}

module.exports = {
  read,
  update,
  delete: destroy,
};
