const router = require("express").Router();
const { Views } = require("../models/View");

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

module.exports = router;
