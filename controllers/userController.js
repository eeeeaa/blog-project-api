const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const User = require("../models/user");

exports.users_get = asyncHandler(async (req, res, next) => {
  res.json({ message: "not implemented: get users" });
});

exports.users_post = asyncHandler(async (req, res, next) => {
  res.json({ message: "not implemented: create user" });
});

exports.users_put = asyncHandler(async (req, res, next) => {
  res.json({
    message: "not implemented: update user",
    userId: req.params.userId,
  });
});

exports.users_delete = asyncHandler(async (req, res, next) => {
  res.json({
    message: "not implemented: delete user",
    userId: req.params.userId,
  });
});
