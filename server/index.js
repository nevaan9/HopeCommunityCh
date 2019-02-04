const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

if (process.env.NODE_ENV === "production") {
  // Serve up the public folder that is created with vue build
  app.use(express.static(__dirname + "/public/"));

  // Single page applications
  app.use(/.*/, (req, res) => {
    res.send(__dirname + "/public/index.html");
  });
}

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
