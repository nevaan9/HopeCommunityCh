const { body } = require("express-validator/check");

const resetValidator = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
];

module.exports = { resetValidator };
