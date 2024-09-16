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

function sortArray(arr) {
  if (arr.length < 2) return arr;
  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i].gross > pivot.gross) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...sortArray(left), pivot, ...sortArray(right)];
}

module.exports = {
  fixIdInArray,
  writeUpdateMovieArray,
  sortArray,
};
