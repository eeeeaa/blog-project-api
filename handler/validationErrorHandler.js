const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

exports.validationErrorHandler = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res
      .status(400)
      .json({ errors: err.formatWith((error) => error.msg).array() });
  } else {
    next();
  }
};

exports.validUserIdErrorHandler = (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.userId)) {
    next();
  } else {
    const err = new Error("invalid user id");
    err.status = 400;
    return next(err);
  }
};

exports.validPostIdErrorHandler = (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.postId)) {
    next();
  } else {
    const err = new Error("invalid post id");
    err.status = 400;
    return next(err);
  }
};

exports.validCommentIdErrorHandler = (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.commentId)) {
    next();
  } else {
    const err = new Error("invalid comment id");
    err.status = 400;
    return next(err);
  }
};
