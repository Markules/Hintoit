module.exports = (app) => {
    // @route GET api/profile
    // @desc Get all profiles
    // access Private
    app.get("/", async (req, res) => {
      try {
        console.log("profile");
      } catch (err) {
        res.status(404).send(err);
      }
    });
  };