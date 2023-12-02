const { get } = require("mongoose");

var toggleStatus = "closed";

function setUp() {
  //   setTimeout(function () {
  //     zeroize();
  //   }, 1500);
}

function openSidebar() {
  $("#sidebar").show();
  if (toggleStatus == "closed") {
    // toggleStatus = "open";
    // unzeroize();
  }
}

function closeSidebar() {
  $("#sidebar").hide();
  if (toggleStatus == "open") {
    toggleStatus = "closed";
    // zeroize();
  }
}

var tmdb_api_key = "e2978d1da72adcf778b7bc358679b035";

const options = { method: "GET", headers: { accept: "application/json" } };

const genres_url =
  "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
  tmdb_api_key +
  "&language=en-US";

async function getGenres() {
  try {
    let response = await fetch(genres_url, options);
    let data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error("error:" + err);
  }
}

async function getImages(json) {
  console.log(json);
  json.results.forEach((element) => {
    console.log(element.backdrop_path);
  });
}

async function run() {
  // await getting all genres
  const genres = await getGenres();
  // genres[3] is comedy, this is where we do specialized queries
  const filters = "&with_genres=" + genres.genres[3].id;
  const movies_url =
    "https://api.themoviedb.org/3/discover/movie?api_key=" +
    tmdb_api_key +
    filters;
  // gets results from
  fetch(movies_url, options)
    .then((res) => res.json())
    .then((json) => getImages(json))
    .catch((err) => console.error("error:" + err));

  return genres;
}

run();
