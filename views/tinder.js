const tmdb_api_key = "e2978d1da72adcf778b7bc358679b035";
const page = Math.floor(Math.random() * 20);

const filters = "&language=en-US&page=" + page + "&include_adult=false";
const images_url = "https://image.tmdb.org/t/p/w500";

const movies_url =
  "https://api.themoviedb.org/3/discover/movie?api_key=" +
  tmdb_api_key +
  filters;
const options = { method: "GET", headers: { accept: "application/json" } };

function getRandom(json) {
  const len = json.results.length;
  const random = Math.floor(Math.random() * len);
  const movie = json.results[random];
  console.log("\n");

  console.log(movie.title);
  console.log(movie.overview);

  console.log(images_url + movie.poster_path);
  console.log(images_url + movie.backdrop_path);
  return movie;
}
// gets results from
fetch(movies_url, options)
  .then((res) => res.json())
  .then((json) => (movie = getRandom(json)))
  .catch((err) => console.error("error:" + err));
