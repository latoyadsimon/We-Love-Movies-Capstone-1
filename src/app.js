if (process.env.USER) require("dotenv").config();
const express = require("express");
const errorHandler = require("../src/errors/errorHandler");
const asyncErrorBoundary = require("../src/errors/asyncErrorBoundary");
const methodNotAllowed = require("../src/errors/methodNotAllowed");
const notFound = require("../src/errors/notFound");

const app = express();

app.use(express.json());

//error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;
