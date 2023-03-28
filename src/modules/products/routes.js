// Controllers.
const getAll = require("./controllers/getAll");

module.exports = (app) => {
  // Get all.
  app.route("/").get(async (req, res) => {
    const data = await getAll(req.query);
    res.status(data.status).json(data);
  });

  return app;
};
