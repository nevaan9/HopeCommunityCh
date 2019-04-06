const router = require("express").Router();
const { Event } = require("../models/Event");
const _ = require("lodash");
const { validationResult } = require("express-validator/check");
const { eventValidator } = require("../middleware/eventValidator");
const { isAdmin } = require("../middleware/authenticate");
const moment = require("moment");

// Get all upcoming events
router.get("/", (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 20;
  Event.find({ date: { $gte: moment(new Date()).subtract(1, "days") } })
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

// Delete an event
router.delete("/:eventId", isAdmin, (req, res) => {
  Event.findByIdAndRemove(req.params.eventId, (err, event) => {
    // As always, handle any potential errors:
    if (err) return res.status(500).send(err);
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    const response = {
      message: "Event successfully deleted",
      name: event.name,
      id: event._id
    };
    return res.status(200).send(response);
  });
});

module.exports = router;
