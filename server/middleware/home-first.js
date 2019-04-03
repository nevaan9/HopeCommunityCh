const { body } = require("express-validator/check");

const homeValidator = [
  body("heading")
    .optional()
    .isLength({ min: 1 })
    .withMessage("Must have no more than 30 characters")
    .trim(),
  body(
    "subHeading",
    "The subheading is either empty or has more than 50 characters"
  )
    .optional()
    .isLength({ min: 1 })
    .trim(),
  body(
    "mainButtonText",
    "The subheading is either empty or has more than 25 characters"
  )
    .optional()
    .isLength({ min: 1 })
    .trim(),
  body(
    "churchesHeader",
    "The churches header is either empty or has more than 30 characters"
  )
    .optional()
    .isLength({ min: 1, max: 30 })
    .trim(),
  body(
    "churchesSubHeader",
    "The churches subheader is either empty or has more than 50 characters"
  )
    .optional()
    .isLength({ min: 1, max: 50 })
    .trim(),
  body(
    "churchOneInfo.time",
    "The churchOneInfo time is either empty or has more than 20 characters"
  )
    .optional()
    .isLength({ min: 1, max: 20 })
    .trim(),
  body(
    "churchOneInfo.location",
    "The churchOneInfo location is either empty or has more than 20 characters"
  )
    .optional()
    .isLength({ min: 1, max: 20 })
    .trim(),
  body(
    "churchOneInfo.description",
    "The churchOneInfo description is either empty or has more than 200 characters"
  )
    .optional()
    .isLength({ min: 1, max: 200 })
    .trim(),
  body(
    "churchOneInfo.text",
    "The churchOneInfo text is either empty or has more than 20 characters"
  )
    .optional()
    .isLength({ min: 1, max: 20 })
    .trim(),
  body(
    "churchTwoInfo.time",
    "The churchTwoInfo time is either empty or has more than 20 characters"
  )
    .optional()
    .isLength({ min: 1, max: 20 })
    .trim(),
  body(
    "churchTwoInfo.location",
    "The churchTwoInfo location is either empty or has more than 20 characters"
  )
    .optional()
    .isLength({ min: 1, max: 20 })
    .trim(),
  body(
    "churchTwoInfo.description",
    "The churchTwoInfo description is either empty or has more than 200 characters"
  )
    .optional()
    .isLength({ min: 1, max: 200 })
    .trim(),
  body(
    "churchTwoInfo.text",
    "The churchTwoInfo text is either empty or has more than 20 characters"
  )
    .optional()
    .isLength({ min: 1, max: 20 })
    .trim(),
  body(
    "churchInfoSectionOne.title",
    "The churchInfoSectionOne title is either empty or has more than 25 characters"
  )
    .optional()
    .isLength({ min: 1, max: 25 })
    .trim(),
  body(
    "churchInfoSectionOne.description",
    "The churchInfoSectionOne description is either empty or has more than 200 characters"
  )
    .optional()
    .isLength({ min: 1, max: 200 })
    .trim(),
  body(
    "churchInfoSectionTwo.title",
    "The churchInfoSectionOne title is either empty or has more than 25 characters"
  )
    .optional()
    .isLength({ min: 1, max: 25 })
    .trim(),
  body(
    "churchInfoSectionTwo.description",
    "The churchInfoSectionTwo description is either empty or has more than 200 characters"
  )
    .optional()
    .isLength({ min: 1, max: 200 })
    .trim()
];

module.exports = { homeValidator };
