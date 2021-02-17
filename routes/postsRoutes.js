module.exports = (app) => {
  // @route GET api/posts
  // @desc Get all posts
  // access Private
  app.get("/", async (req, res) => {
    try {
      console.log("posts");
    } catch (err) {
      res.status(404).send(err);
    }
  });
};
