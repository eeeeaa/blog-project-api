const { validationResult } = require("express-validator");

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
