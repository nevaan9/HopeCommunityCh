const router = require("express").Router();
const mongoose = require("mongoose");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const multer = require("multer");
const { Views } = require("../models/View");
const { removeImage } = require("../utils/utils");
const { isAdmin } = require("../middleware/authenticate");

// Create mongo connection
const conn = mongoose.createConnection(process.env.MONGODB_URI);
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

router.get("/:imagename", (req, res) => {
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

router.post("/:imagename", isAdmin, (req, res) => {
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
          console.log(err);
          return res.end(err);
        });
    }
  });
});

module.exports = router;
