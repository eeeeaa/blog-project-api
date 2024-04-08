const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const Comment = require("../models/comment");

exports.comments_get = asyncHandler(async (req, res, next) => {
  res.json({
    message: "not implemented: get comments",
    postId: req.params.postId,
  });
});

exports.comments_post = asyncHandler(async (req, res, next) => {
  res.json({
    message: "not implemented: create comment",
    postId: req.params.postId,
  });
});

exports.comments_put = asyncHandler(async (req, res, next) => {
  res.json({
    message: "not implemented: update comment",
    postId: req.params.postId,
    commentId: req.params.commentId,
  });
});

exports.comments_delete = asyncHandler(async (req, res, next) => {
  res.json({
    message: "not implemented: delete comment",
    postId: req.params.postId,
    commentId: req.params.commentId,
  });
});
