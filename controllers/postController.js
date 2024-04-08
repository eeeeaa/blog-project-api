const asyncHandler = require("express-async-handler");
const passport = require("passport");
const { body, validationResult } = require("express-validator");

const Post = require("../models/post");

exports.posts_get = asyncHandler(async (req, res, next) => {
  res.json({ message: "not implemented: get posts" });
});

exports.posts_get_one = asyncHandler(async (req, res, next) => {
  res.json({
    message: "not implemented: get one post",
    postId: req.params.postId,
  });
});
exports.posts_post = [
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req, res, next) => {
    res.json({ message: "not implemented: create post" });
  }),
];

exports.posts_put = [
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req, res, next) => {
    res.json({
      message: "not implemented: update post",
      postId: req.params.postId,
    });
  }),
];

exports.posts_delete = [
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req, res, next) => {
    res.json({
      message: "not implemented: delete post",
      postId: req.params.postId,
    });
  }),
];
