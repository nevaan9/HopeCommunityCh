const router = require("express").Router();
const { Event } = require("../models/Event");
const _ = require("lodash");
const { validationResult } = require("express-validator/check");
const { eventValidator } = require("../middleware/eventValidator");
const { isAdmin } = require("../middleware/authenticate");

router.get("/", (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 20;
  Event.find({ date: { $gte: new Date() } })
    .sort({ date: 1 })
    .limit(limit)
    .exec(function(err, events) {
      if (err) {
        res.status(400).send(err);
      }
      res.send(events);
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
