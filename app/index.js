let path = require("path");

module.exports = async function (app, opts) {
  app.register(require("fastify-static"), {
    root: path.join(__dirname, "..", "public")
  });

  app.register(require("./router"));
};
