const _ = require("lodash");
const Path = require("path-parser").default;
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const { ObjectID } = require("mongodb");
const { find } = require("lodash");

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

  //Fetch all gifts
  app.get("/api/gifts", async (req, res) => {
    try {
      const gifts = await Gift.find().populate('_user')
      res.send(gifts);
    } catch (err) {
      res.status(404).send(err);
    }
  });

  //Fetch gift by id
  app.get("/api/gift/:id", requireLogin, async (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
    try {
      const gift = await Gift.findOne({ _id: id });
      console.log(gift);
      res.send(gift);
    } catch (err) {
      res.status(400).send();
    }
  });

  //Create new gift
  app.post("/api/gifts", requireLogin, async (req, res) => {
    const { url } = req.body;
    console.log(url);
    const gift = new Gift({
      url,
      _user: req.user.id,
      dateCreated: Date.now(),
    });

    try {
      await gift.save();
      console.log("new gift id:", gift._id);

     const user = await User.findOneAndUpdate(
          { _id: req.user._id },
          { $push: { _gifts: gift._id } }
        );
        console.log(user._gifts);
        res.send(gift);
     
    } catch (err) {
      res.status(422).send(err);
    }
  });

  //Delete gift
  app.delete(`/api/gifts/:id`, requireLogin, async (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
    try {
      const gift = await Gift.findOneAndRemove({ _id: id });
      
      const user = await User.findOneAndUpdate(
          { _id: req.user._id },
          { $pull: { _gifts: id } }
      )
          res.send({gift, user });
    } catch (err) {
      res.status(400).send(err);
    }
  });

  //Edit gift
  app.patch("/api/gifts/:id", requireLogin, async (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ["title", "url"]);

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
    try {
      const data = await Gift.findOneAndUpdate({ _id: id }, body, {
        new: true,
      });
      console.log(data);
      res.send(data);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.patch(`/api/gifts/like/:id`, requireLogin, async (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send("Gift Doesn't Exist");
    }
    try {
      const gift = await Gift.findOneAndUpdate(
        { _id: id },
        {
          $addToSet: { likedBy: req.user._id, new: true },
        }
      );
      res.send(gift.likedBy);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.patch(`/api/gifts/unlike/:id`, requireLogin, async (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send("Gift Doesn't Exist");
    }
    try {
      const gift = await Gift.findOneAndUpdate(
        { _id: id },
        {
          $pull: { likedBy: req.user._id, new: true },
        }
      );
      res.send(gift.likedBy);
    } catch (err) {
      res.status(400).send(err);
    }
  });
};
