const mongoose = require("mongoose");

const Home = mongoose.model("Home", {
  heading: {
    type: String,
    required: true,
    trim: true
  },
  subHeading: {
    type: String,
    required: true,
    trim: true
  },
  mainButtonText: {
    type: String,
    required: true,
    trim: true
  },
  mainCoverPicture: {
    type: String,
    required: true
  },
  mainCenterPicture: {
    type: String,
    required: true
  },
  churchesHeader: {
    type: String,
    required: true
  },
  churchesSubHeader: {
    type: String,
    required: true
  },
  churchOneInfo: {
    picture: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  churchTwoInfo: {
    picture: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  secondaryCoverPicture: {
    type: String,
    required: true
  },
  churchInfoSectionOne: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  churchInfoSectionTwo: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }
});

module.exports = { Home };
