const asyncHandler = require("express-async-handler");
const passport = require("passport");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const {
  validationErrorHandler,
  validPostIdErrorHandler,
  validCommentIdErrorHandler,
} = require("../handler/validationErrorHandler");

const Post = require("../models/post");
const Comment = require("../models/comment");

exports.comments_get = [
  validPostIdErrorHandler,
  asyncHandler(async (req, res, next) => {
    const [post, allCommentsByPosts] = await Promise.all([
      Post.findById(req.params.postId).exec(),
      Comment.find({ post: req.params.postId }).sort({ created_at: -1 }).exec(),
    ]);

    if (post === null) {
      const err = new Error("post not found");
      err.status = 404;
      return next(err);
    }

    res.json({
      post: post,
      comments: allCommentsByPosts,
    });
  }),
];

exports.comments_get_one = [
  validPostIdErrorHandler,
  validCommentIdErrorHandler,
  asyncHandler(async (req, res, next) => {
    const [post, comment] = await Promise.all([
      Post.findById(req.params.postId).exec(),
      Comment.findById(req.params.commentId).exec(),
    ]);

    if (post === null) {
      const err = new Error("post not found");
      err.status = 404;
      return next(err);
    }

    if (comment === null) {
      const err = new Error("comment not found");
      err.status = 404;
      return next(err);
    }

    res.json({
      post: post,
      comment: comment,
    });
  }),
];

exports.comments_post = [
  body("comment")
    .trim()
    .isLength({ min: 1 })
    .withMessage("comment must not be empty")
    .escape(),
  body("created_at").optional({ values: "falsy" }).isISO8601().toDate(),
  validationErrorHandler,
  validPostIdErrorHandler,
  asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.postId).exec();
    if (post === null) {
      const err = new Error("post not found");
      err.status = 404;
      return next(err);
    }

    const comment = new Comment({
      comment: req.body.comment,
      created_at: req.body.created_at,
      post: req.params.postId,
    });

    comment.save();
    res.json({
      comment: comment,
    });
  }),
];

exports.comments_put = [
  passport.authenticate("jwt", { session: false }),
  body("comment")
    .trim()
    .isLength({ min: 1 })
    .withMessage("comment must not be empty")
    .escape(),
  body("created_at").optional({ values: "falsy" }).isISO8601().toDate(),
  validationErrorHandler,
  validPostIdErrorHandler,
  validCommentIdErrorHandler,
  asyncHandler(async (req, res, next) => {
    const [post, existComment] = await Promise.all([
      Post.findById(req.params.postId).exec(),
      Comment.findById(req.params.commentId).exec(),
    ]);

    if (post === null) {
      const err = new Error("post not found");
      err.status = 404;
      return next(err);
    }

    if (existComment === null) {
      const err = new Error("comment not found");
      err.status = 404;
      return next(err);
    }

    const comment = new Comment({
      comment: req.body.comment,
      created_at:
        req.body.created_at === undefined
          ? existComment.created_at
          : req.body.created_at,
      post: req.params.postId,
      _id: req.params.commentId,
    });

    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      comment,
      { new: true }
    );
    res.json({ updatedComment });
  }),
];

exports.comments_delete = [
  passport.authenticate("jwt", { session: false }),
  validPostIdErrorHandler,
  validCommentIdErrorHandler,
  asyncHandler(async (req, res, next) => {
    const [post, existComment] = await Promise.all([
      Post.findById(req.params.postId).exec(),
      Comment.findById(req.params.commentId).exec(),
    ]);

    if (post === null) {
      const err = new Error("post not found");
      err.status = 404;
      return next(err);
    }

    if (existComment === null) {
      const err = new Error("comment not found");
      err.status = 404;
      return next(err);
    }

    const deletedComment = await Comment.findByIdAndDelete(
      req.params.commentId
    );
    res.json({ deletedComment });
  }),
];
