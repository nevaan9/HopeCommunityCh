const { body } = require("express-validator/check");
const moment = require("moment");

const eventValidator = [
  body("name")
    .isLength({ min: 1, max: 30 })
    .withMessage("Must have no more than 30 characters")
    .trim(),
  body("startTime", "The start time has les/more than 4 characters")
    .isLength({ min: 4, max: 4 })
    .custom((value, { req }) => {
      if (!isNaN(parseInt(value))) {
        return true;
      }
      throw new Error("Time is not in correct format");
    })
    .trim(),
  body("date")
    .isLength({ min: 10, max: 10 })
    .custom((value, { req }) => {
      if (moment(value).isValid()) {
        return true;
      }
      throw new Error("Date is not in correct format");
    })
    .trim(),
  body(
    "location",
    "The location is either empty or has more than 30 characters"
  )
    .isLength({ min: 1, max: 30 })
    .trim(),
  body(
    "description",
    "The description is either empty or has more than 200 characters"
  )
    .isLength({ max: 200 })
    .trim()
];

module.exports = { eventValidator };
