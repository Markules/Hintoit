const express = require("express");
const { check, validationResult } = require("express-validator");
const requireLogin = require("../middlewares/requireLogin");

const Post = require("../models/Post");
const User = require("../models/User");

module.exports = (app) => {

  // @route POST api/posts
  // @desc  Create new post
  // @access Private
  app.post(
    "/",
    [requireLogin, [check("text", "Text is required").not().isEmpty()]],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      try {
        const user = await User.findById(req.user.id).select("-password");

        const newPost = new Post({
          text: req.body.text,
          name: user.name,
          avatar: user.avatar,
          user: req.user.id,
        });

        const post = await newPost.save();

        res.json(post);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    }
  );

  // @route GET api/posts
  // @desc  Get all posts
  // @access Private
  app.get("/", requireLogin, async (req, res) => {
    try {
      const posts = await Post.find().sort({ date: -1 });
      res.json(posts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  // @route GET api/posts/:id
  // @desc  Get post by id
  // @access Private
  app.get("/:id", requireLogin, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }
      res.json(post);
    } catch (err) {
      console.error(err.message);

      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "Post not found" });
      }
      res.status(500).send("Server Error");
    }
  });

  // @route DELETE api/posts/:id
  // @desc  Delete post by id
  // @access Private
  app.delete("/:id", requireLogin, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      //Check post

      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }

      //Check user
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "User not authorized" });
      }

      await post.remove();

      res.json({ msg: "Post removed" });
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "Post not found" });
      }
      res.status(500).send("Server Error");
    }
  });

  // @route PUT api/posts/like/:id
  // @desc  Like a post
  // @access Private
  app.put("/like/:id", requireLogin, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      // Check if the post has already been liked
      if (
        post.likes.filter((like) => like.user.toString() === req.user.id)
          .length > 0
      ) {
        return res.status(400).json({ msg: "Post already liked" });
      }
      post.likes.unshift({ user: req.user.id });

      await post.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  // @route PUT api/posts/unlike/:id
  // @desc  unLike a post
  // @access Private
  app.put("/unlike/:id", requireLogin, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      // Check if the post has already been liked
      if (
        post.likes.filter((like) => like.user.toString() === req.user.id)
          .length === 0
      ) {
        return res.status(400).json({ msg: "Post has not yet been liked" });
      }

      // Get remove index
      const removeIndex = post.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.id);

      post.likes.splice(removeIndex, 1);

      await post.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  // @route POST api/posts/comment/:id
  // @desc  Comment on a post
  // @access Private
  app.post(
    "/comment/:id",
    [requireLogin, [check("text", "Text is required").not().isEmpty()]],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      try {
        const user = await User.findById(req.user.id).select("-password");

        const post = await Post.findById(req.params.id);

        const newComment = {
          text: req.body.text,
          name: user.name,
          avatar: user.avatar,
          user: req.user.id,
        };

        post.comments.unshift(newComment);

        await post.save();

        res.json(post.comments);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    }
  );

  // @route DELETE api/posts/comment/:id/:comment_id
  // @desc  Delete comment
  // @access Private
  app.delete("/comment/:id/:comment_id", requireLogin, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      // Pull out comment
      const comment = post.comments.find(
        (comment) => comment.id === req.params.comment_id
      );
      // Make sure comment exists
      if (!comment) {
        return res.status(404).json({ msg: "Comment does not exist" });
      }

      // Check user
      if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "User not authorized" });
      }

      // Get remove index
      const removeIndex = post.comments
        .map((comment) => comment.user.toString())
        .indexOf(req.user.id);

      post.comments.splice(removeIndex, 1);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
};
