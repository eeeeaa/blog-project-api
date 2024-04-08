const asyncHandler = require("express-async-handler");
const passport = require("passport");
const { body, validationResult } = require("express-validator");

const User = require("../models/user");

exports.users_get = [
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req, res, next) => {
    res.json({ message: "not implemented: get users" });
  }),
];

exports.users_get_one = [
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req, res, next) => {
    res.json({
      message: "not implemented: get one user",
      userId: req.params.userId,
    });
  }),
];

exports.users_post = [
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req, res, next) => {
    res.json({ message: "not implemented: create user" });
  }),
];

exports.users_put = [
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req, res, next) => {
    res.json({
      message: "not implemented: update user",
      userId: req.params.userId,
    });
  }),
];

exports.users_delete = [
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req, res, next) => {
    res.json({
      message: "not implemented: delete user",
      userId: req.params.userId,
    });
  }),
];
