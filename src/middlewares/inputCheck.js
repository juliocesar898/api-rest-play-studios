const { check, validationResult } = require("express-validator");

const createUserValidation = () => {
  return [
    check("username", "username field is required").not().isEmpty(),
    check("username", "username field must be a string").isString(),
    check("email", "email field is required").not().isEmpty(),
    check("email", "email field must be a string").isString(),
    check("password", "password field is required").not().isEmpty(),
    check("password", "password field must be a string").isString(),
    check(
      "password",
      "password field must greater than 7 and less than 13"
    ).isLength({ min: 8, max: 12 }),
  ];
};

const changePasswordValidation = () => {
  return [
    check("newPassword", "newPassword field is required").not().isEmpty(),
    check("newPassword", "newPassword field must be a string").isString(),
    check(
      "newPassword",
      "newPassword field must greater than 7 and less than 13"
    ).isLength({ min: 8, max: 12 }),
  ];
};

const createBetValidation = () => {
  return [
    check("codeBeat", "codeBeat field is required").not().isEmpty(),
    check("codeBeat", "codeBeat field must be a string").isString(),
    check("description", "description field is required").not().isEmpty(),
    check("description", "description field must be a string").isString(),
    check("amount", "amount field is required").not().isEmpty(),
    check("amount", "amount field must be a number").isNumeric(),
  ];
}

const validate = (req, res, next) => {
  const errors = validationResult(req);
  let response = { message: null };
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push(err.msg));

  response.message = extractedErrors;
  return res.status(422).send(response);
};

module.exports = {
  createUserValidation,
  changePasswordValidation,
  validate,
  createBetValidation
};
