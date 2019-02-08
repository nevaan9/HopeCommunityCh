// Load the global configs
require("./config/config");
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const app = express();

// Configure how multer stores files
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/images`);
  },
  filename: (req, file, cd) => {
    cd(null, `${new Date().toISOString()}-${file.originalname}`);
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
app.use(cors());

// Connect to the DB
const mongoose = require("mongoose");
// Enable mongoose to user promises
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

// Load the routes
const userRoutes = require("./routes/user");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/test", (req, res) => {
  res.status(200).send(req.file);
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
