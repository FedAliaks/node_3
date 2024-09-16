const fs = require("fs");

function fixIdInArray(arr) {
  return arr.map((item, index) => {
    return {
      ...item,
      id: index + 1,
    };
  });
}

function writeUpdateMovieArray(res, newArr, sendMsg) {
  fs.writeFile("movies.txt", JSON.stringify(newArr), (err) => {
    if (err) {
      res.status(500).send("error");
    } else {
      res.status(200).send(JSON.stringify(sendMsg));
    }
  });
}

module.exports = {
  fixIdInArray,
  writeUpdateMovieArray,
};
