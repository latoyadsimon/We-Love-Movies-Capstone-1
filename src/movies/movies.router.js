// the router function tells the information what url route to go to
//reference Mod35NodeExpressAndPostgres vscode notes

const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).all(methodNotAllowed);

router
  .route("?is_showing=true")
  .get(controller.listIsShowing)
  .all(methodNotAllowed);

router.route("/:movieId").get(controller.read).all(methodNotAllowed);

router
  .route("/:movieId/theaters")
  .get(controller.listAllTheaters)
  .all(methodNotAllowed);

router
  .route("/:movieId/reviews")
  .get(controller.listReviewsAndCritics).module.exports = router;
