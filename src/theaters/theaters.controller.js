const theatersService = require("./theaters.service");

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  const data = await theatersService.list();
  res.json({ data: data });
  //   res.status(200).json({ data: await theatersService.list() });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
};
