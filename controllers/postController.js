const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const Post = require("../models/post");

exports.posts_get = asyncHandler(async (req, res, next) => {
  res.json({ message: "not implemented: get posts" });
});

exports.posts_post = asyncHandler(async (req, res, next) => {
  res.json({ message: "not implemented: create post" });
});

exports.posts_put = asyncHandler(async (req, res, next) => {
  res.json({
    message: "not implemented: update post",
    postId: req.params.postId,
  });
});

exports.posts_delete = asyncHandler(async (req, res, next) => {
  res.json({
    message: "not implemented: delete post",
    postId: req.params.postId,
  });
});
