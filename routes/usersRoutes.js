const _ = require("lodash");
const Path = require("path-parser").default;
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const { ObjectID } = require("mongodb");
const multer = require("multer");
const { last } = require("lodash");
const { rootURL } = require("../config/dev");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname.trim(""));
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const User = mongoose.model("users");
const Image = mongoose.model("Image");

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

  //upload profile picture
  app.post(
    "/api/profile/image",
    upload.single("image"),
    requireLogin,
    async (req, res, next) => {
      console.log(req);
      const loggedUserId = req.user.id;
      const profileImage = new Image({
        _id: new mongoose.Types.ObjectId(),
        name: req.file.originalname,
        image: req.file.path,
        _user: loggedUserId,
      });
      try {
        await profileImage.save();
        res.send(profileImage);

        await User.findOneAndUpdate(
          { _id: loggedUserId },
          { $push: { profileImage: profileImage._id } }
        );
      } catch (err) {
        res.status(422).send(err);
        console.error("Something went wrong", err);
      }
    }
  );
  // ​
  // // get profile picture
  app.get("/api/profile/image", requireLogin, async (req, res) => {
    const loggedUserId = req.user.id;
    try {
      const user = await User.findOne({ _id: loggedUserId }).populate(
        "profileImage"
      );
      const lastImage = user.profileImage.reverse();
      if (user.profileImage.length === 0) {
        res.send(null);
      }
      if (process.env.NODE_ENV === "production") {
        res.send(process.env.ROOT_URL + lastImage[0].image);
      }
      res.send(rootURL + lastImage[0].image);
      console.log();
    } catch (err) {
      res.status(400).send(err);
    }
  });

  // get friend profile image
  app.get("/api/profile/image/:id", async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.findOne({ _id: userId }).populate("profileImage");
      const lastImage = user.profileImage.reverse();
      if (lastImage.length === 0) {
        res.status(404).send(undefined);
      }
      if (process.env.NODE_ENV === "production") {
        res.send(process.env.ROOT_URL + lastImage[0].image);
      }
      res.send(rootURL + lastImage[0].image);
      console.log(user.profileImage);
    } catch (err) {
      res.status(400).send(err);
    }
  });
};
