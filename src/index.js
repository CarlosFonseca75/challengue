// Dependencies and routes.
const express = require("express");
const routes = require("./modules/products/routes");

// Variables.
const app = express();
const port = 3000;

// Init routes.
routes(app);

// Init server.
app.listen(port, () => {
  console.log(`Express server listening on http://localhost:${port}`);
});
