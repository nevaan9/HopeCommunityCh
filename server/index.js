// Load the global configs
require("./config/config");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { Views } = require("./models/View");
const { homeValidator } = require("./middleware/home-first");
const { validationResult } = require("express-validator/check");
const { isAdmin } = require("./middleware/authenticate");
// Connect to the DB
require("./db/connectDB");
//Middlewear
app.use(bodyParser.json());
app.use(cors());

// Load the routes
const userRoutes = require("./routes/user");
const eventRoutes = require("./routes/event");
const homeRoutes = require("./routes/home");
const imageRoutes = require("./routes/image");

// Edit home
app.post("/editHome/:section", [isAdmin, homeValidator], (req, res) => {
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

// Use the routes
app.use("/user", userRoutes);
app.use("/event", eventRoutes);
app.use("/home", homeRoutes);
app.use("/image", imageRoutes);

if (process.env.NODE_ENV === "production") {
  // Serve up the public folder that is created with vue build
  app.use(express.static(__dirname + "/public/"));

  // Single page applications
  app.use("*", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });
}

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
});
