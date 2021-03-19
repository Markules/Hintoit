const express = require("express");
const requireLogin = require("../middlewares/requireLogin");
const { check, validationResult } = require("express-validator");
const normalize = require("normalize-url");
const Profile = require("../models/Profile");
const User = require("../models/User");
const Gift = require("../models/Gift");

module.exports = (app) => {
  // @route GET api/profile/me
  // @desc  Get Current users profiles
  // @access Private
  app.get("/api/profile/me", requireLogin, async (req, res) => {
    console.log(req.user.id);
    try {
      const profile = await Profile.findOne({
        user: req.user.id,
      }).populate("user", [
        "firstName",
        "lastName",
        "avatar",
        "following",
        "followers",
      ]);

      if (!profile) {
        return res
          .status(400)
          .json({ msg: "There is no profile for this user " });
      }
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  app.post("/api/profile/create", requireLogin, async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    const {
      website,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
      tiktok,
      pinterest,
      ...rest
    } = req.body;

    // Build profile object
    const profileFields = {
      user: req.user.id,
      website:
        website && website !== ""
          ? normalize(website, { forceHttps: true })
          : "",
      ...rest,
    };
    // Build social object
    const socialFields = {
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram,
      tiktok,
      pinterest,
    };

    // normalize social fields to ensure valid url
    for (const [key, value] of Object.entries(socialFields)) {
      if (value && value.length > 0)
        socialFields[key] = normalize(value, { forceHttps: true });
    }

    // add to profileFields
    profileFields.social = socialFields;

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  // @route GET api/profile/:user_id
  // @desc  Get profile by user id
  // @access Public
  app.get("/api/profile/:user_id", async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.user_id }).select(
        "firstName lastName avatar CreatedAt followers following"
      );

      const profile = await Profile.findOne({
        user: req.params.user_id,
      }).select("website location bio social");

      const profileFields = {
        user,
        profile: profile && profile,
      };

      if (!profile && !user)
        return res.status(400).json({ msg: "Profile not found" });

      res.json(profileFields);
    } catch (err) {
      console.error(err.message);
      if (err.kind == "ObjectId") {
        return res.status(400).json({ msg: "Profile not found" });
      }
      res.status(500).send("Server Error");
    }
  });

  // @route DELETE api/profile
  // @desc  Delete profile, user & posts
  // @access Private
  app.delete("/api/profile", requireLogin, async (req, res) => {
    try {
      // Remove User Gifts
      await Gift.deleteMany({ _user: req.user.id });
      // Remove Profile
      await Profile.findOneAndRemove({ user: req.user.id });
      // Remove User
      await User.findByIdAndRemove({ _id: req.user.id });
      res.json({ msg: "User deleted" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
};
