const express = require("express");
const requireLogin = require("../middlewares/requireLogin");
const { check, validationResult } = require("express-validator");

const Profile = require("../models/Profile");
const User = require("../models/User");

module.exports = (app) => {
  // @route GET api/profile/me
  // @desc  Get Current users profiles
  // @access Private
  app.get("/api/profile/me/:id", async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.params.id,
      }).populate("user", ["firstName", "lastName", "avatar"]);

      if (!profile) {
        return res
          .status(400)
          .json({ msg: "There is no profile for this user " });
      }
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  app.post("/api/profile/create", requireLogin, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      website,
      location,
      bio,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
      tiktok,
      pinterest,
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;

    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;
    if (tiktok) profileFields.social.tiktok = tiktok;
    if (pinterest) profileFields.social.pinterest = pinterest;

    try {
      let profile = Profile.findOne({ user: req.user.id });

      // if (profile) {
      //   // Update
      //   profile = await Profile.findOneAndUpdate(
      //     { user: req.user.id },
      //     { $set: profileFields },
      //     { new: true }
      //   );

      //   res.json(profile);
      // }

      // Create
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
};
