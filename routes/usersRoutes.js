const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const { ObjectID } = require("mongodb");

const User = mongoose.model("users");

module.exports = (app) => {
  // @route GET api/profile
  // @desc  Get all profiles
  // @access Public
  app.get("/api/users", async (req, res) => {
    try {
      const users = await User.find().select("-userToken -googleId -email");
      res.json(users);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
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
      if (!userGifts) {
        return res.status(404).json({ msg: "Items not found" });
      }
      res.send(userGifts._gifts);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  });

  // @route GET api/user/gifts/:id
  // @desc  Get gifts of user by id
  // @access Public
  app.get("/api/user/gifts/:id", async (req, res) => {
    const userId = req.params.id;
    try {
      const userGifts = await User.findOne({ _id: userId }).populate("_gifts");
      if (!userGifts) {
        return res.status(404).json({ msg: "Item not found" });
      }
      res.send(userGifts._gifts);
    } catch (err) {
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "Item not found" });
      }
      console.error(err);
      res.status(500).send("Server Error");
    }
  });

  // @route GET api/following/:id
  // @desc  Get Following users
  // @access Public
  app.get("/api/following/:id", async (req, res) => {
    const userId = req.params.id;
    console.log(userId);
    try {
      const users = await User.findById(userId).populate("following");
      return res.json(users.following);
    } catch (err) {
      res.status(404).send(err);
      console.log(err);
    }
  });

  // @route GET api/profile
  // @desc  Get  Followers users
  // @access Public
  app.get("/api/followers/:id", async (req, res) => {
    const userId = req.params.id;
    try {
      const users = await User.findById(userId).populate("followers");
      return res.json(users.followers);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
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
      console.error(err);
      res.status(500).send("Server Error");
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
      await User.findOneAndUpdate(
        { _id: id },
        {
          $pull: { followers: req.user.id, new: true },
        }
      );
      res.json(user.following);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  });
};
