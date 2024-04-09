const asyncHandler = require("express-async-handler");
const passport = require("passport");
const {
  validationErrorHandler,
  validPostIdErrorHandler,
} = require("../handler/validationErrorHandler");
const { body } = require("express-validator");

const Post = require("../models/post");

exports.posts_get = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find()
    .sort({ updated_at: -1 })
    .limit(req.query.limit)
    .exec();
  res.json({
    posts: allPosts,
  });
});

exports.posts_get_one = [
  validPostIdErrorHandler,
  asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.postId).exec();
    if (post === null) {
      const err = new Error("post not found");
      err.status = 404;
      return next(err);
    }
    res.json({ post });
  }),
];
exports.posts_post = [
  passport.authenticate("jwt", { session: false }),
  body("post_title")
    .trim()
    .isLength({ min: 1 })
    .withMessage("post title must not be empty")
    .escape(),
  body("post_content")
    .trim()
    .isLength({ min: 1 })
    .withMessage("post title must not be empty")
    .escape(),
  body("created_at").optional({ values: "falsy" }).isISO8601().toDate(),
  body("updated_at").optional({ values: "falsy" }).isISO8601().toDate(),
  body("post_status").escape(),
  validationErrorHandler,
  asyncHandler(async (req, res, next) => {
    const post = new Post({
      post_title: req.body.post_title,
      post_content: req.body.post_content,
      created_at:
        req.body.created_at === undefined ? Date.now() : req.body.created_at,
      updated_at:
        req.body.updated_at === undefined ? Date.now() : req.body.updated_at,
      post_status: req.body.post_status,
    });

    post.save();
    res.json({ post });
  }),
];

exports.posts_put = [
  passport.authenticate("jwt", { session: false }),
  body("post_title")
    .trim()
    .isLength({ min: 1 })
    .withMessage("post title must not be empty")
    .escape(),
  body("post_content")
    .trim()
    .isLength({ min: 1 })
    .withMessage("post title must not be empty")
    .escape(),
  body("created_at").optional({ values: "falsy" }).isISO8601().toDate(),
  body("updated_at").optional({ values: "falsy" }).isISO8601().toDate(),
  body("post_status").escape(),
  validationErrorHandler,
  validPostIdErrorHandler,
  asyncHandler(async (req, res, next) => {
    const existPost = await Post.findById(req.params.postId).exec();
    if (existPost === null) {
      const err = new Error("post not found");
      err.status = 404;
      return next(err);
    }
    const post = new Post({
      post_title: req.body.post_title,
      post_content: req.body.post_content,
      created_at:
        req.body.created_at === undefined
          ? existPost.created_at
          : req.body.created_at,
      updated_at:
        req.body.updated_at === undefined ? Date.now() : req.body.updated_at,
      post_status: req.body.post_status,
      _id: req.params.postId,
    });

    const updatedPost = await Post.findByIdAndUpdate(req.params.postId, post, {
      new: true,
    });
    res.json({
      updatedPost,
    });
  }),
];

exports.posts_delete = [
  passport.authenticate("jwt", { session: false }),
  validPostIdErrorHandler,
  asyncHandler(async (req, res, next) => {
    const existPost = await Post.findById(req.params.postId).exec();
    if (existPost === null) {
      const err = new Error("post not found");
      err.status = 404;
      return next(err);
    }
    const deletedPost = await Post.findByIdAndDelete(req.params.postId);
    res.json({
      deletedPost,
    });
  }),
];
