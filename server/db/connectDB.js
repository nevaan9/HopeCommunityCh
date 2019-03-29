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
          mainCoverPicture: "1553837434151MAIN_COVER_PICTURE.jpeg",
          mainCenterPicture: "1553837438497MAIN_CENTER_PICTURE.png",
          churchesHeader: "Our Churches from the DB!",
          churchesSubHeader: "Lets goooo",
          churchOneInfo: {
            picture: "1553837448955CHURCH_ONE_PICTURE.jpeg",
            text: "Church #1",
            location: "Somewhere nice",
            time: "12 midnight!",
            description: "My heart goes shalalala"
          },
          churchTwoInfo: {
            picture: "1553837452798CHURCH_TWO_PICTURE.jpeg",
            text: "Churchy #2",
            location: "Somewhere nicer",
            time: "12 noon!",
            description: "Yo yo yo yoy yo"
          },
          secondaryCoverPicture: "1553837465440SECONDARY_COVER_PICTURE.jpeg",
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
          .catch(e => {
            console.log(e);
          });
      }
    });
  })
  .catch(e => {
    console.log(e);
  });
