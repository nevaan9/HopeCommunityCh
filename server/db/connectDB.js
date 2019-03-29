const mongoose = require("mongoose");
const { Home } = require("../models/Home");
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
