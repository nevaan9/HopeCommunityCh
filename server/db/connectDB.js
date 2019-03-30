const mongoose = require("mongoose");
const { Views } = require("../models/View");
// Enable mongoose to user promises
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    Views.find({}).then(viewsArr => {
      if (!viewsArr.length) {
        new Views({
          home: {
            heading: "Hope Community Church",
            subHeading: "Serving People Everywhere",
            mainButtonText: "Learn more about us!",
            mainCoverPicture: "1553837434151MAIN_COVER_PICTURE.jpeg",
            mainCenterPicture: "1553837438497MAIN_CENTER_PICTURE.png",
            churchesHeader: "Our Churches",
            churchesSubHeader: "We Worship in Multiple Locations!",
            churchOneInfo: {
              picture: "1553837448955CHURCH_ONE_PICTURE.jpeg",
              text: "Church #1",
              location: "Alexandria, VA",
              time: "8am",
              description:
                "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident"
            },
            churchTwoInfo: {
              picture: "1553837452798CHURCH_TWO_PICTURE.jpeg",
              text: "Churchy #2",
              location: "Washington, DC",
              time: "6pm",
              description:
                "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident"
            },
            secondaryCoverPicture: "1553837465440SECONDARY_COVER_PICTURE.jpeg",
            churchInfoSectionOne: {
              title: "More Info",
              description:
                "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident"
            },
            churchInfoSectionTwo: {
              title: "Contact Us",
              description:
                "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident"
            }
          }
        })
          .save()
          .then(() => {
            console.log("Added Home Data to DB!");
          })
          .catch(e => {
            console.log(e);
          });
      }
    });
  })
  .catch(e => {
    console.log(e);
  });
