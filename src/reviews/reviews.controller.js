const reviewsService = require("./reviews.service");

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

function read(req, res) {
  const { review: data } = res.locals;
  res.json({ data });
}

async function reviewExists(req, res, next) {
  const review = await reviewsService.read(req.params.reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: `Review cannot be found.` });
}

async function destroy(req, res) {
  const { review } = res.locals;
  await reviewsService.delete(review.review_id);
  res.status(204).json(`204 No Content`);
}

module.exports = {
  read: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(read)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
