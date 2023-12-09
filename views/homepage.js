var toggleStatus = "closed";

function setUp() {
  //   setTimeout(function () {
  //     zeroize();
  //   }, 1500);
}

function openSidebar() {
  $("#sidebar").show();
  if (toggleStatus == "closed") {
    toggleStatus = "open";
  }
}

function closeSidebar() {
  $("#sidebar").hide();
  if (toggleStatus == "open") {
    toggleStatus = "closed";
  }
}

var tmdb_api_key = "e2978d1da72adcf778b7bc358679b035";

const options = { method: "GET", headers: { accept: "application/json" } };

const popular_url =
  "https://api.themoviedb.org/3/discover/movie?api_key=" +
  tmdb_api_key +
  "&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

const images_url = "https://image.tmdb.org/t/p/w500/";

async function getPopular() {
  try {
    let response = await fetch(popular_url, options);
    let data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error("error:" + err);
  }
}
const data = await getPopular();
data;
