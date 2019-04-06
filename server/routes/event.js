const router = require("express").Router();
const { Event } = require("../models/Event");
const _ = require("lodash");
const { validationResult } = require("express-validator/check");
const { eventValidator } = require("../middleware/eventValidator");
const { isAdmin } = require("../middleware/authenticate");

router.get("/", (req, res) => {
  Event.find({})
    .then(events => {
      res.send(events);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// Post an event
router.post("/", [isAdmin, eventValidator], (req, res) => {
  // Get Errors (if any) from validation middleware
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).send({ error: errors.array() });
  } else {
    const body = _.pick(req.body, [
      "name",
      "startTime",
      "date",
      "location",
      "description"
    ]);
    // Create new User Object
    const event = new Event(body);

    // Save the User
    event
      .save(event)
      .then(savedEvent => {
        return res.status(200).send(savedEvent);
      })
      .catch(e => res.status(400).send(e));
  }
});

module.exports = router;
