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

let kieranKey = "8ea8d568";
let t = "totoro";
let requestLink = "http://www.omdbapi.com/?apikey=" + kieranKey + "&t=" + t;
/* ^ fetch input stuff ^ */

let allInfo = "";

async function getInfo(file) {
  let x = await fetch(file);
  let y = await x.text();
  allInfo = JSON.parse(y);
}

let title;
let poster;
let year;
let description;

async function run() {
  await getInfo(requestLink);
  title = allInfo["Title"];
  console.log(title);
}

run();

var tmdb_api_key = "e2978d1da72adcf778b7bc358679b035";

const options = { method: "GET", headers: { accept: "application/json" } };

const genres_url =
  "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
  tmdb_api_key +
  "&language=en-US";

const jsonstuff = fetch(genres_url, options)
  .then((res) => res.json())
  .then((json) => () => {
    return json;
  })
  .catch((err) => console.error("error:" + err));

console.log(jsonstuff);

const url =
  "&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28";
var rl =
  "https://api.themoviedb.org/3/discover/movie?api_key=" + tmdb_api_key + url;

// fetch(rl, options)
//   .then((res) => res.json())
//   .then((json) => console.log(json))
//   .catch((err) => console.error("error:" + err));
