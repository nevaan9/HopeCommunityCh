// Load the global configs
require("./config/config");
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const app = express();
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");
const { Home } = require("./models/Home");
const { removeImage } = require("./utils/utils");
// Connect to the DB
require("./db/connectDB");
// Create mongo connection
const conn = mongoose.createConnection(process.env.MONGODB_URI);

//Middlewear
app.use(bodyParser.json());
app.use(cors());

// Init gfs
let gfs;

conn.once("open", () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

// Create storage engine
const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = `${new Date().valueOf()}${file.originalname}.${
        file.mimetype.split("/")[1]
      }`;
      const fileInfo = {
        filename: filename,
        bucketName: "uploads"
      };
      req.fileInfo = fileInfo;
      resolve(fileInfo);
    });
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

const upload = multer({ storage, fileFilter }).single("image");

// Serve the images
app.use(express.static(__dirname + "/images/"));

// Load the routes
const userRoutes = require("./routes/user");

app.get("/home", (req, res) => {
  Home.find({})
    .then(homeObj => {
      res.send(homeObj[0]);
    })
    .catch(e => {
      res.send(e);
    });
});

app.post("/upload", (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.end("Error uploading file!");
    }
    const imageName = req.fileInfo ? req.fileInfo.filename : null;
    if (imageName) {
      Home.find({})
        .then(homeObj => {
          switch (req.file.originalname) {
            case "MAIN_COVER_PICTURE":
              // removeImage(`${__dirname}/images/${homeObj[0].mainCoverPicture}`);
              homeObj[0].mainCoverPicture = imageName;
              break;
            case "MAIN_CENTER_PICTURE":
              // removeImage(
              //   `${__dirname}/images/${homeObj[0].mainCenterPicture}`
              // );
              homeObj[0].mainCenterPicture = imageName;
              break;
            case "CHURCH_ONE_PICTURE":
              // removeImage(
              //   `${__dirname}/images/${homeObj[0].churchOneInfo.picture}`
              // );
              homeObj[0].churchOneInfo.picture = imageName;
              break;
            case "CHURCH_TWO_PICTURE":
              // removeImage(
              //   `${__dirname}/images/${homeObj[0].churchTwoInfo.picture}`
              // );
              homeObj[0].churchTwoInfo.picture = imageName;
              break;
            case "SECONDARY_COVER_PICTURE":
              // removeImage(
              //   `${__dirname}/images/${homeObj[0].secondaryCoverPicture}`
              // );
              homeObj[0].secondaryCoverPicture = imageName;
              break;
            default:
              break;
          }
          return homeObj[0].save().then(result => {
            res.send(req.fileInfo);
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
