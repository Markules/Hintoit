const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const { ObjectID } = require("mongodb");
const mailer = require("../services/mailer");
const { check, validationResult } = require("express-validator");
const { post } = require("request");
const Gift = mongoose.model("gifts");
const User = mongoose.model("users");

module.exports = (app) => {
  // Fetch gifts by current user id
  app.get("/api/loggeduser/gifts", requireLogin, async (req, res) => {
    try {
      const gifts = await Gift.find({ _user: req.user.id });
      res.send(gifts);
    } catch (err) {
      res.status(404).send(err);
    }
  });

  // @route GET api/gifts
  // @desc  Get all gifts
  // @access Public
  app.get("/api/gifts", async (req, res) => {
    try {
      const gifts = await Gift.find()
        .populate("_user")
        .sort({ dateCreated: -1 });
      res.json(gifts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  // @route GET api/gift/:id
  // @desc  Get gift by id
  // @access Private
  app.get("/api/gift/:id", requireLogin, async (req, res) => {
    const id = req.params.id;

    try {
      const gift = await Gift.findById(id);

      if (!gift) {
        return res.status(404).json({ msg: "Item not found" });
      }
      res.json(gift);
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "Item not found" });
      }
      res.status(500).send("Server Error");
    }
  });

  // @route POST api/gift/add
  // @desc  Create new gift
  // @access Private
  app.post(
    "/api/gift/add",
    [requireLogin, [check("url", "URL is required").not().isEmpty()]],
    async (req, res) => {
      const { url } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }
      try {
        const gift = new Gift({
          url,
          _user: req.user.id,
          dateCreated: Date.now(),
        });

        await gift.save();

        await User.findOneAndUpdate(
          { _id: req.user._id },
          { $push: { _gifts: gift._id } }
        );
        res.json(gift);
      } catch (err) {
        console.error(err.message);
        res.status(500).send["Server Error"];
      }
    }
  );

  // @route DELETE api/gifts/:id
  // @desc  Delete post by id
  // @access Private
  app.delete(`/api/gifts/:id`, requireLogin, async (req, res) => {
    const id = req.params.id;

    try {
      const gift = await Gift.findById(id);

      if (!gift) {
        return res.status(404).json({ msg: "Item not found" });
      }

      if (gift._user.toString() !== req.user.id) {
        return res
          .status(401)
          .json({ msg: "User not authorized to delete this item" });
      }

      await gift.remove();

      await User.findOneAndUpdate(
        { _id: req.user._id },
        { $pull: { _gifts: id } }
      );
      res.json({ msg: "Item removed" });
    } catch (err) {
      console.log(err.message);
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "Item not found" });
      }
      res.status(500).send("Server Error");
    }
  });

  // @route PATCH api/gifts/:id
  // @desc  Edit a gift
  // @access Private
  app.patch("/api/gifts/:id", requireLogin, async (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ["title", "url"]);

    try {
      const data = await Gift.findOneAndUpdate({ _id: id }, body, {
        new: true,
      });
      res.json(data);
    } catch (err) {
      console.log(err.message);
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "Post not found" });
      }
      res.status(500).send("Server Error");
    }
  });

  // @route PUT api/gifts/like/:id
  // @desc  Like a gift
  // @access Private
  app.put(`/api/gifts/like/:id`, requireLogin, async (req, res) => {
    const id = req.params.id;

    try {
      const gift = await Gift.findById(id);
      // Check if the gift has already been liked
      if (
        gift.likes.filter((like) =>  like.user.toString() === req.user.id)
          .length > 0
      ) {
        return res.status(400).json({ msg: "Item already liked" });
      }
      gift.likes.unshift({ user: req.user.id });

      await gift.save();
      res.json(gift);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  // @route PUT api/gifts/unlike/:id
  // @desc  Unlike a gift
  // @access Private
  app.put(`/api/gifts/unlike/:id`, requireLogin, async (req, res) => {
    const id = req.params.id;

    try {
      const gift = await Gift.findById(id);
      // Check if the gift has already been liked
      if (
        gift.likes.filter((like) => like.user.toString() === req.user.id)
          .length === 0
      ) {
        return res.status(400).json({ msg: "Item has not yet been liked" });
      }

      // Get remove index
      const removeIndex = gift.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.id);

      gift.likes.splice(removeIndex, 1);

      await gift.save();
      return res.json(gift);

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  // @route POST api/gift/share
  // @desc  share a gift by email
  // @access Private
  app.post(
    "/api/gift/share",
    [
      requireLogin,
      [
        check("item", "URL is required").not().isEmpty(),
        check("name", "Name is required").not().isEmpty(),
        check("email", "Email is required").isEmail(),
      ],
    ],
    async (req, res) => {
      const { email, name, item } = req.body;
      const userName = req.user.firstName;

      try {
        const mail = await mailer.sendEmail(email, name, item, userName);
        res.json(mail);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );
};
