const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const { ObjectID } = require("mongodb");

const User = mongoose.model("users");


module.exports = (app) => {
  //Fetch User by id
  app.get("/api/users/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const user = await User.findOne({ _id: id }).populate("profileImage");
      res.send(user);
    } catch (err) {
      res.status(404).send(err);
    }
  });

  //Fetch all users
  app.get("/api/users", async (req, res) => {
    try {
      const users = await User.find();
      res.send(users);
    } catch (err) {
      res.status(404).send(err);
      console.log(err);
    }
  });

  //Create new user
  app.post("/api/users", requireLogin, async (req, res) => {
    const { email, firstName, lastName } = req.body;

    const user = new User({
      email,
      firstName,
      lastName,
      createdAt: Date.now(),
    });

    try {
      await user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  // Fetch gifts of cuurent user
  app.get("/api/currentuser/gifts", requireLogin, async (req, res) => {
    const loggedUserId = req.user.id;

    try {
      const userGifts = await User.findOne({ _id: loggedUserId }).populate(
        "_gifts"
      );
      res.send(userGifts._gifts);
    } catch (err) {
      res.status(404).send(err);
      console.log(err);
    }
  });

  // Fetch Following users
  app.get("/api/follow", requireLogin, async (req, res) => {
    const loggedUserId = req.user.id;
    console.log(loggedUserId);
    try {
      const users = await User.findById(loggedUserId).populate("following");
      res.send(users.following);
    } catch (err) {
      res.status(404).send(err);
      console.log(err);
    }
  });

  app.patch(`/api/users/follow/:id`, requireLogin, async (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send("User Doesn't Exist");
    }
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          $addToSet: { following: id, new: true },
        }
      );
      const addFollower = await User.findOneAndUpdate(
        { _id: id },
        {
          $addToSet: { followers: req.user.id, new: true },
        }
      );
      res.send(
        "Added Following:",
        user.following,
        "New Follower:",
        addFollower.followers
      );
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.patch(`/api/users/unfollow/:id`, requireLogin, async (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send("User Doesn't Exist");
    }
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          $pull: { following: id, new: true },
        }
      );
      const removeFollower = await User.findOneAndUpdate(
        { _id: id },
        {
          $pull: { followers: req.user.id, new: true },
        }
      );
      res.send(user.following);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.get("/api/followers", requireLogin, async (req, res) => {
    const loggedUserId = req.user.id;
    console.log(loggedUserId);
    try {
      const users = await User.findById(loggedUserId).populate("followers");
      res.send(users.followers);
    } catch (err) {
      res.status(404).send(err);
      console.log(err);
    }
  });

}
