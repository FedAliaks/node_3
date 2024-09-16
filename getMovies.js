const axios = require("axios");
const fs = require("fs");

const movies = [];

const url1 =
  "https://api.kinopoisk.dev/v1.4/movie?page=1&limit=250&selectFields=name&selectFields=top250&selectFields=type&selectFields=names&selectFields=rating&selectFields=year&selectFields=fees&selectFields=budget&selectFields=poster&notNullFields=top250&sortField=top250&sortType=1&type=movie&type=anime";
const headerRequest = {
  "X-API-KEY": "1JRVFVK-G0FM07V-KNVPFHB-8MEBEYV",
};

async function getMoviesArr() {
  const response = await axios.get(url1, { headers: headerRequest });

  response.data.docs.forEach((movie, index) => {
    try {
      const sumFees = movie.fees
        ? Object.keys(movie.fees).reduce(
            (acc, item) => acc + movie.fees[item]?.value,
            0,
          )
        : null;

      const newMovie = {
        id: index + 1,
        title: movie?.name || movie?.names[0] || "default name",
        rating: movie.rating.kp,
        year: movie.year,
        budget: movie?.budget?.value || 0,
        gross: sumFees,
        poster: movie.poster?.url || "no image",
        position: movie.top250,
      };
      movies.push(newMovie);
    } catch (err) {
      console.log(err);
    }
  });

  fs.writeFile("movies.txt", JSON.stringify(movies), (err) => {
    if (err) console.log(err.message);
  });
}

module.exports = {
  getMoviesArr,
};
