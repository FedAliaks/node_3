const express = require("express");
const fs = require("fs");
const path = require("path");
const {
  fixIdInArray,
  writeUpdateMovieArray,
  sortArray,
} = require("../helpers");

const filmRoutes = express.Router();

filmRoutes.get("/read/:id", (req, res) => {
  const {
    params: { id },
  } = req;

  fs.readFile(path.join(__dirname, "../movies.txt"), (err, data) => {
    const movieArr = JSON.parse(data.toString());
    if (id > movieArr.length) res.status(500).send('request invalid')
    const movie = movieArr.find((item) => item.id == id);
    res.status(200).send(movie);
  });
});

filmRoutes.post("/delete", (req, res) => {
  const {
    body: { id },
  } = req;

  fs.readFile(path.join(__dirname, "../movies.txt"), (err, data) => {
    const movieArr = JSON.parse(data.toString());
    if (id < 1 || id > movieArr.length) res.status(500).send('request invalid')
    const deleteMovie = movieArr[id - 1];
    const newArr = fixIdInArray([
      ...movieArr.slice(0, id - 1),
      ...movieArr.slice(id),
    ]);

    writeUpdateMovieArray(res, newArr, deleteMovie);
  });
});

filmRoutes.post("/update", (req, res) => {
  const { id, title, rating, year, budget, gross, poster, position } = req.body;

  fs.readFile(path.join(__dirname, "../movies.txt"), (err, data) => {
    const movieArr = JSON.parse(data.toString());
    if (id < 1 || id > movieArr.length) res.status(500).send('request invalid')
    const movieForUpdate = movieArr.find((item) => item.id == id);
    const updateMovie = {
      id: id,
      title: title || movieForUpdate.title,
      rating: rating || movieForUpdate.rating,
      year: year || movieForUpdate.year,
      budget: budget || movieForUpdate.budget,
      gross: gross || movieForUpdate.gross,
      poster: poster || movieForUpdate.poster,
      position: position || movieForUpdate.position,
    };

    const newArr = movieArr.map((item) => (item.id != id ? item : updateMovie));
    writeUpdateMovieArray(res, newArr, updateMovie);
  });
});

filmRoutes.get("/readall", (req, res) => {
  fs.readFile(path.join(__dirname, "../movies.txt"), (err, data) => {
    const movieArr = JSON.parse(data.toString());
    const sortedArr = sortArray(movieArr);
    res.status(200).send(sortedArr);
  });
});

filmRoutes.post("/create", (req, res) => {
  const { id, title, rating, year, budget, gross, poster, position } = req.body;
  if (
    !id ||
    !title ||
    !rating ||
    !year ||
    !budget ||
    !gross ||
    !poster ||
    !position
  ) {
    res.status(500).send("request invalid");
  } else {
    const newMovie = {
      id: id,
      title: title,
      rating: rating,
      year: year,
      budget: budget,
      gross: gross,
      poster: poster,
      position: position,
    };

    fs.readFile(path.join(__dirname, "../movies.txt"), (err, data) => {
      const movieArr = JSON.parse(data.toString());
      const newArr =
        id > movieArr.length
          ? fixIdInArray([...movieArr, newMovie])
          : fixIdInArray([
              ...movieArr.slice(0, id - 1),
              newMovie,
              ...movieArr.slice(id - 1),
            ]);
      writeUpdateMovieArray(res, newArr, newMovie);
    });
  }
});

module.exports = {
  filmRoutes,
};
