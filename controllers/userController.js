const asyncHandler = require("express-async-handler");
const passport = require("passport");
const { body } = require("express-validator");
const {
  validationErrorHandler,
  validUserIdErrorHandler,
} = require("../handler/validationErrorHandler");
const { getHash } = require("../utils/passwordUtils");

const User = require("../models/user");

exports.users_get = [
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req, res, next) => {
    const allUsers = await User.find()
      .sort({ username: 1 })
      .limit(req.query.limit)
      .exec();
    res.json({
      users: allUsers,
    });
  }),
];

exports.users_get_one = [
  passport.authenticate("jwt", { session: false }),
  validUserIdErrorHandler,
  asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.userId).exec();
    if (user === null) {
      const err = new Error("user not found");
      err.status = 404;
      return next(err);
    }
    res.json({
      user: user,
    });
  }),
];

//for admin to create user - no password confirm
exports.users_post = [
  passport.authenticate("jwt", { session: false }),
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("username must not be empty")
    .escape(),
  body("password")
    .trim()
    .isLength({ min: 1 })
    .withMessage("password must not be empty")
    .escape(),
  validationErrorHandler,
  asyncHandler(async (req, res, next) => {
    const hash = await getHash(req.body.password);
    const existUser = await User.findOne({ username: req.body.username });

    if (existUser) {
      const err = new Error("User already exists");
      err.status = 409;
      return next(err);
    }
    const user = new User({
      username: req.body.username,
      password: hash,
    });

    user.save();
    res.json({
      user,
    });
  }),
];

exports.users_put = [
  passport.authenticate("jwt", { session: false }),
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("username must not be empty")
    .escape(),
  body("password")
    .trim()
    .isLength({ min: 1 })
    .withMessage("password must not be empty")
    .escape(),
  validationErrorHandler,
  validUserIdErrorHandler,
  asyncHandler(async (req, res, next) => {
    const hash = await getHash(req.body.password);
    const existUser = await User.findById(req.params.userId);

    if (existUser === null) {
      const err = new Error("User does not exist, can't update");
      err.status = 404;
      return next(err);
    }
    const user = new User({
      username: req.body.username,
      password: hash,
      _id: req.params.userId,
    });

    const updatedUser = await User.findByIdAndUpdate(req.params.userId, user, {
      new: true,
    });
    res.json({
      updatedUser,
    });
  }),
];

exports.users_delete = [
  passport.authenticate("jwt", { session: false }),
  validUserIdErrorHandler,
  asyncHandler(async (req, res, next) => {
    const existUser = await User.findById(req.params.userId).exec();
    if (existUser === null) {
      const err = new Error("User does not exist, can't delete");
      err.status = 404;
      return next(err);
    }
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    res.json({
      deletedUser,
    });
  }),
];
