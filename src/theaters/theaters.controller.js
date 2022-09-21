const theatersService = require("./theaters.service");

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  const data = await theatersService.list();
  res.json({ data: data }); //list all the theaters
  //   res.status(200).json({ data: await theatersService.list() });
}

// async function listTheatersAndMovies(req, res) {
//     return await theatersService
// }

module.exports = {
  list: [asyncErrorBoundary(list)],
};
