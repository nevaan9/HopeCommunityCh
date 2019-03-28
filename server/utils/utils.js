const fs = require("fs");

function removeImage(pathToImage) {
  fs.unlink(pathToImage, err => {
    if (err) {
      if (err.code !== "ENOENT") {
        throw err;
      }
    }
    console.log(`Removed ${pathToImage}`);
  });
}

module.exports = { removeImage };
