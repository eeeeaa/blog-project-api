const asyncHandler = require("express-async-handler");
const passport = require("passport");
const { body, validationResult } = require("express-validator");

const Comment = require("../models/comment");

exports.comments_get = asyncHandler(async (req, res, next) => {
  res.json({
    message: "not implemented: get comments",
    postId: req.params.postId,
  });
});

exports.comments_get_one = asyncHandler(async (req, res, next) => {
  res.json({
    message: "not implemented: get one comment",
    postId: req.params.postId,
    commentId: req.params.commentId,
  });
});

exports.comments_post = asyncHandler(async (req, res, next) => {
  res.json({
    message: "not implemented: create comment",
    postId: req.params.postId,
  });
});

exports.comments_put = [
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req, res, next) => {
    res.json({
      message: "not implemented: update comment",
      postId: req.params.postId,
      commentId: req.params.commentId,
    });
  }),
];

exports.comments_delete = [
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req, res, next) => {
    res.json({
      message: "not implemented: delete comment",
      postId: req.params.postId,
      commentId: req.params.commentId,
    });
  }),
];
