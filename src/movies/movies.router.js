// the router function tells the information what url route to go to
//reference Mod35NodeExpressAndPostgres vscode notes

const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).all(methodNotAllowed);

router.route("/:movieId").get(controller.read).all(methodNotAllowed);

// router.use("/:movieId/theaters", controller.movieExists, theatersRouter); //this directs the member to the theatersRouter and sends the movieExists function with them

router
  .route("/:movieId/theaters")
  .get(controller.listAllTheaters)
  .all(methodNotAllowed);

router
  .route("/:movieId/reviews")
  .get(controller.listReviewsAndCritics)
  .all(methodNotAllowed);

module.exports = router;
