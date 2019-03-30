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
const { Views } = require("./models/View");
const { removeImage } = require("./utils/utils");
// Connect to the DB
require("./db/connectDB");
// Create mongo connection
const conn = mongoose.createConnection(process.env.MONGODB_URI);

//Middlewear
app.use(bodyParser.json());
app.use(cors());

// Init imagesDB
let imagesDB;

conn.once("open", () => {
  // Init stream
  imagesDB = Grid(conn.db, mongoose.mongo);
  imagesDB.collection("image-uploads");
});

// Create storage engine
const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  file: (req, file) => {
    return new Promise(resolve => {
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
      ) {
        const imagename = `${new Date().valueOf()}${req.params.imagename}`;
        const fileInfo = {
          filename: imagename,
          bucketName: "image-uploads"
        };
        req.fileInfo = fileInfo;
        resolve(fileInfo);
      } else {
        return null;
      }
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
  Views.find({})
    .then(viewsArr => {
      res.send(viewsArr[0].home);
    })
    .catch(e => {
      res.send(e);
    });
});

// Edit home
app.post("/editHome/:section", (req, res) => {
  Views.find({}).then(viewsArr => {
    const home = viewsArr[0].home;
    if (req.params.section === "first") {
      home.heading = req.body.heading;
      home.subHeading = req.body.subHeading;
    } else if (req.params.section === "second") {
      home.churchesHeader = req.body.heading;
      home.churchesSubHeader = req.body.subHeading;
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
});

app.get("/image/:imagename", (req, res) => {
  imagesDB.files.findOne({ filename: req.params.imagename }, (err, file) => {
    // Check if the input is a valid image or not
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists"
      });
    }

    // If the file exists then check whether it is an image
    if (
      file.contentType === "image/jpeg" ||
      file.contentType === "image/png" ||
      file.contentType === "image/jpeg"
    ) {
      // Read output to browser
      const readstream = imagesDB.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: "Not an image"
      });
    }
  });
});

app.post("/image/:imagename", (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.end("Error uploading file!");
    }
    const imagename = req.fileInfo ? req.fileInfo.filename : null;
    if (imagename) {
      Views.find({})
        .then(viewsArr => {
          const home = viewsArr[0].home;
          switch (req.params.imagename) {
            case "MAIN_COVER_PICTURE":
              removeImage(imagesDB, home.mainCoverPicture);
              home.mainCoverPicture = imagename;
              break;
            case "MAIN_CENTER_PICTURE":
              removeImage(imagesDB, home.mainCenterPicture);
              home.mainCenterPicture = imagename;
              break;
            case "CHURCH_ONE_PICTURE":
              removeImage(imagesDB, home.churchOneInfo.picture);
              home.churchOneInfo.picture = imagename;
              break;
            case "CHURCH_TWO_PICTURE":
              removeImage(imagesDB, home.churchTwoInfo.picture);
              home.churchTwoInfo.picture = imagename;
              break;
            case "SECONDARY_COVER_PICTURE":
              removeImage(imagesDB, home.secondaryCoverPicture);
              home.secondaryCoverPicture = imagename;
              break;
            default:
              break;
          }
          return viewsArr[0].save().then(result => {
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
