const fs = require("fs");

function removeImage(imageDB, filename) {
  imageDB.remove(
    { filename: filename, root: "image-uploads" },
    (err, gridStore) => {
      if (err) {
        console.log("Error deleting file", err);
      }
    }
  );
}

module.exports = { removeImage };
