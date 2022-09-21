//the controller file is where the CRUD functions go

const moviesService = require("./movies.service");

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  const { is_showing } = req.query;
  //const data =
  // res.json({ data: data });

  if (is_showing === "true") {
    res.json({
      data: await (await moviesService.listIsShowing(is_showing)).splice(0, 15),
    });
  }

  res.status(200).json({ data: await moviesService.list() });
}

//middleware
async function movieExists(req, res, next) {
  const movie = await moviesService.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}

function read(req, res) {
  const { movie: data } = res.locals;
  res.status(200).json({ data });
}

// //list all the theaters associated with that movie
async function listAllTheaters(req, res) {
  const movieId = res.locals.movie.movie_id;
  const result = await moviesService.listAllTheaters(movieId);
  res.status(200).json({ data: result });
}

async function listReviewsAndCritics(req, res) {
  const movieId = res.locals.movie.movie_id;
  const result = await moviesService.listReviewsAndCritics(movieId);
  res.status(200).json({ data: result });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  listAllTheaters: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listAllTheaters),
  ],
  listReviewsAndCritics: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listReviewsAndCritics),
  ],
};
