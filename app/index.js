module.exports = async function (app, _opts) {
  app.get("/", async function (req, res) {
    console.log(Object.keys(req.id))
    return "this is an example apps";
  });
};
