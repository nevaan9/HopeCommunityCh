// Load the global configs
require("./config/config");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const helmet = require("helmet");
// Logger
const morgan = require("morgan");
// Just log the errors
const morganLogger = morgan("combined", {
  skip: function(req, res) {
    return res.statusCode < 400;
  }
});
// Cors - only allows access to our domian
const whitelist = process.env.WHITELIST.split(",");
var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};
// Connect to the DB
require("./db/connectDB");
//Middlewear
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(morganLogger);

// Load the routes
const userRoutes = require("./routes/user");
const eventRoutes = require("./routes/event");
const homeRoutes = require("./routes/home");
const imageRoutes = require("./routes/image");

// Use the routes
app.use(helmet());
app.use(helmet({ hidePoweredBy: { setTo: "PHP 7.3.3" } }));
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
