const express = require("express");
const { getMoviesArr } = require("./getMovies");

const app = express();

app.get("/", (req, res) => {
  res.send("hello world. I am express");
});

app.listen(3000, () => {
  console.log("server has already started on port 3000");
  /*     getMoviesArr(); */
});
