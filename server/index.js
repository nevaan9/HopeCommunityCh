// Load the global configs
require("./config/config");
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const app = express();
const { Home } = require("./models/Home");
const { removeImage } = require("./utils/utils");

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

// Connect to the DB
require("./db/connectDB");

// Serve the images
app.use(express.static(__dirname + "/images/"));

// Load the routes
const userRoutes = require("./routes/user");

app.get("/home", (req, res) => {
  Home.find({}).then(homeObj => {
    res.send(homeObj[0]);
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
