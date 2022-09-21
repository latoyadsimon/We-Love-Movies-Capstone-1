const reviewsService = require("./reviews.service");
//const hasProperties = require("../errors/hasProperties");

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
  const review = await reviewsService.read(req.params.reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: `Review cannot be found.` });
}

//validation middleware
const VALID_PROPERTIES = [
  "review_id",
  "content",
  "score",
  "movie_id",
  "critic_id",
  "created_at",
  "updated_at",
];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid fields(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

//const hasRequiredProperties = hasProperties("content");

function read(req, res) {
  const { review: data } = res.locals;
  res.json({ data });
}

function update(req, res, next) {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  reviewsService
    .update(updatedReview)
    .then((data) => res.json({ data }))
    .catch(next);
}

//another way to solve it
// async function update(req, res) {
//   const time = new Date().toISOString();
//   const reviewId = res.locals.review.review_id;
//   const updatedReview = {
//     ...req.body.data,
//     review_id: reviewId,
//   };
//   await reviewsService.update(updatedReview);
//   const rawData = await reviewsService.updateCritic(reviewId);
//   const data = { ...rawData[0], created_at: time, updated_at: time };
//   res.json({ data });
// }

async function destroy(req, res) {
  const { review } = res.locals;
  await reviewsService.delete(review.review_id);
  res.status(204).json(`204 No Content`);
}

module.exports = {
  read: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(read)],
  update: [
    asyncErrorBoundary(reviewExists),
    hasOnlyValidProperties,
    //hasRequiredProperties,
    asyncErrorBoundary(update),
  ],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
