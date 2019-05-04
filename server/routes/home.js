const router = require("express").Router();
const { validationResult } = require("express-validator/check");
const { Views } = require("../models/View");
const { homeValidator } = require("../middleware/home-first");
const { isAdmin } = require("../middleware/authenticate");

router.get("/", (req, res) => {
  Views.find({})
    .then(viewsArr => {
      res.send(viewsArr[0].home);
    })
    .catch(e => {
      console.log(e);
      res.send(e);
    });
});

// Edit home
router.post("/editHome/:section", [isAdmin, homeValidator], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).send({ error: errors.array() });
  } else {
    Views.find({}).then(viewsArr => {
      const home = viewsArr[0].home;
      if (req.params.section === "first") {
        home.heading = req.body.heading;
        home.subHeading = req.body.subHeading;
        home.mainButtonText = req.body.mainButtonText;
      } else if (req.params.section === "second") {
        home.churchesHeader = req.body.churchesHeader;
        home.churchesSubHeader = req.body.churchesSubHeader;
        home.churchOneInfo.location = req.body.churchOneInfo.location;
        home.churchOneInfo.time = req.body.churchOneInfo.time;
        home.churchOneInfo.description = req.body.churchOneInfo.description;
        home.churchTwoInfo.location = req.body.churchTwoInfo.location;
        home.churchTwoInfo.time = req.body.churchTwoInfo.time;
        home.churchTwoInfo.description = req.body.churchTwoInfo.description;
      } else if (req.params.section === "fourth") {
        home.churchInfoSectionOne = req.body.churchInfoSectionOne;
        home.churchInfoSectionTwo = req.body.churchInfoSectionTwo;
      }
      return viewsArr[0]
        .save()
        .then(result => {
          res.send(result);
        })
        .catch(error => {
          console.log(error);
          res.send({
            error
          });
        });
    });
  }
});

module.exports = router;
