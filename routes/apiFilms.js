const express = require("express");
const fs = require("fs");
const path = require("path");
const { fixIdInArray } = require("../helpers");

const filmRoutes = express.Router();

filmRoutes.get("/read/:id", (req, res) => {
  const {
    params: { id },
  } = req;
  fs.readFile(path.join(__dirname, "../movies.txt"), (err, data) => {
    const movie = JSON.parse(data.toString()).find((item) => item.id == id);
    res.status(200).send(movie);
  });
});

filmRoutes.post("/delete", (req, res) => {
  const {
    body: { id },
  } = req;

  fs.readFile(path.join(__dirname, "../movies.txt"), (err, data) => {
    const movieArr = JSON.parse(data.toString());
    const deleteMovie = movieArr[id - 1];
    const newArr = fixIdInArray([
      ...movieArr.slice(0, id - 1),
      ...movieArr.slice(id),
    ]);

    fs.writeFile("movies.txt", JSON.stringify(newArr), (err) => {
      if (err) {
        res.status(500).send("error");
      } else {
        res.status(200).send(deleteMovie);
      }
    });
  });
});

module.exports = {
  filmRoutes,
};
