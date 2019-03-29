// Load the global configs
require("./config/config");
// Connect to the DB
// require("./db/connectDB");
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const app = express();
const { removeImage } = require("./utils/utils");
const mongoose = require("mongoose");
const { Home } = require("./models/Home");
// Enable mongoose to user promises
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    Home.find({}).then(homeObj => {
      if (!homeObj.length) {
        new Home({
          heading: "New Home Community Church From DB!",
          subHeading: "We are live from the DB!",
          mainButtonText: "Learn more about us!",
          mainCoverPicture: "hello.png",
          mainCenterPicture: "hello.png",
          churchesHeader: "Our Churches from the DB!",
          churchesSubHeader: "Lets goooo",
          churchOneInfo: {
            picture: "hello.png",
            text: "Church #1",
            location: "Somewhere nice",
            time: "12 midnight!",
            description: "My heart goes shalalala"
          },
          churchTwoInfo: {
            picture: "hello.png",
            text: "Churchy #2",
            location: "Somewhere nicer",
            time: "12 noon!",
            description: "Yo yo yo yoy yo"
          },
          secondaryCoverPicture: "hello.png",
          churchInfoSectionOne: {
            title: "Info section #1",
            description: "des #1"
          },
          churchInfoSectionTwo: {
            title: "info #2",
            description: "desc #2"
          }
        })
          .save()
          .then(() => {})
          .catch(e => {
            throw new Error(e);
          });
      }
    });
  });

// Configure how multer stores files
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/images`);
  },
  filename: (req, file, cd) => {
    const imageName = `${new Date().valueOf()}${file.originalname}.${
      file.mimetype.split("/")[1]
    }`;
    // Save the image name so we can save it to the DB
    req.imageName = imageName;
    cd(null, imageName);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
const upload = multer({ storage: fileStorage, fileFilter: fileFilter }).single(
  "image"
);
app.use(cors());

// Serve the images
app.use(express.static(__dirname + "/images/"));

// Load the routes
const userRoutes = require("./routes/user");

app.get("/home", (req, res) => {
  res.send({
    heading: "New Home Community Church From DB!",
    subHeading: "We are live from the DB!",
    mainButtonText: "Learn more about us!",
    mainCoverPicture: "1553746841144MAIN_COVER_PICTURE.jpeg",
    mainCenterPicture: "1553826004743MAIN_CENTER_PICTURE.jpeg",
    churchesHeader: "Our Churches from the DB!",
    churchesSubHeader: "Lets goooo",
    churchOneInfo: {
      picture: "1553747460510CHURCH_ONE_PICTURE.jpeg",
      text: "Church #1",
      location: "Somewhere nice",
      time: "12 midnight!",
      description: "My heart goes shalalala"
    },
    churchTwoInfo: {
      picture: "1553747479893CHURCH_TWO_PICTURE.jpeg",
      text: "Churchy #2",
      location: "Somewhere nicer",
      time: "12 noon!",
      description: "Yo yo yo yoy yo"
    },
    secondaryCoverPicture: "1553748176128SECONDARY_COVER_PICTURE.jpeg",
    churchInfoSectionOne: {
      title: "Info section #1",
      description: "des #1"
    },
    churchInfoSectionTwo: {
      title: "info #2",
      description: "desc #2"
    }
  });
});

app.post("/test", (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.end("Error uploading file!");
    }
    const imageName = req.imageName ? req.imageName : null;
    if (imageName) {
      Home.find({})
        .then(homeObj => {
          switch (req.file.originalname) {
            case "MAIN_COVER_PICTURE":
              removeImage(`${__dirname}/images/${homeObj[0].mainCoverPicture}`);
              homeObj[0].mainCoverPicture = imageName;
              break;
            case "MAIN_CENTER_PICTURE":
              removeImage(
                `${__dirname}/images/${homeObj[0].mainCenterPicture}`
              );
              homeObj[0].mainCenterPicture = imageName;
              break;
            case "CHURCH_ONE_PICTURE":
              removeImage(
                `${__dirname}/images/${homeObj[0].churchOneInfo.picture}`
              );
              homeObj[0].churchOneInfo.picture = imageName;
              break;
            case "CHURCH_TWO_PICTURE":
              removeImage(
                `${__dirname}/images/${homeObj[0].churchTwoInfo.picture}`
              );
              homeObj[0].churchTwoInfo.picture = imageName;
              break;
            case "SECONDARY_COVER_PICTURE":
              removeImage(
                `${__dirname}/images/${homeObj[0].secondaryCoverPicture}`
              );
              homeObj[0].secondaryCoverPicture = imageName;
              break;
            default:
              break;
          }
          return homeObj[0].save().then(result => {
            res.end("Successfully uploaded file!");
          });
        })
        .catch(err => {
          return res.end(err);
        });
    }
  });
});

// Use the routes
app.use("/user", userRoutes);

if (process.env.NODE_ENV === "production") {
  // Serve up the public folder that is created with vue build
  app.use(express.static(__dirname + "/public/"));

  // Single page applications
  app.use(/.*/, (req, res) => {
    res.send(__dirname + "/public/index.html");
  });
}

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
});
