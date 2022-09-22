if (process.env.USER) require("dotenv").config();
const express = require("express");
const errorHandler = require("./errors/errorHandler");

const notFound = require("./errors/notFound");

const cors = require("cors");
const app = express();

const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");

app.use(cors());
app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

// app.get("/movies", (req, res, next) => {
//     const is_showing = req.query.is_showing;
//     if(is_showing === "true") {
//         res.send(movie)

//     }
// }
// )

//error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;
