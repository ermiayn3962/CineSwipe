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

// function unzeroize() {
//   document.getElementById("sidebar").style.width = "250px";
//   document.getElementById("sidebar").style.padding = "15px";

//   document.getElementById("x-out").style.fontSize = "30px";

//   document.getElementById("subheader").style.fontSize = "30px";

//   document.getElementById("empty").style.fontSize = "20px";

//   const thumbnails = document.getElementsByClassName("thumbnail");
//   for (let i = 0; i < thumbnails.length; i++) {
//     thumbnails[i].style.height = "160px";
//     thumbnails[i].style.width = "120px";
//   }
//   const titles = document.getElementsByClassName("title");
//   for (let i = 0; i < titles.length; i++) {
//     titles[i].style.fontSize = "25px";
//   }
//   const years = document.getElementsByClassName("year");
//   for (let i = 0; i < years.length; i++) {
//     years[i].style.fontSize = "15px";
//   }
//   const genres = document.getElementsByClassName("genre");
//   for (let i = 0; i < genres.length; i++) {
//     genres[i].style.fontSize = "15px";
//   }
//   const blurbs = document.getElementsByClassName("blurb");
//   for (let i = 0; i < blurbs.length; i++) {
//     blurbs[i].style.borderBottom = "4px dotted white";
//   }
// }

// function zeroize() {
//   document.getElementById("sidebar").style.width = "0px";
//   document.getElementById("sidebar").style.padding = "0px";

//   document.getElementById("x-out").style.fontSize = "0px";

//   document.getElementById("subheader").style.fontSize = "0px";

//   document.getElementById("empty").style.fontSize = "0px";

//   const thumbnails0 = document.getElementsByClassName("thumbnail");
//   for (let i = 0; i < thumbnails0.length; i++) {
//     thumbnails0[i].style.height = "0px";
//     thumbnails0[i].style.width = "0px";
//   }
//   const titles0 = document.getElementsByClassName("title");
//   for (let i = 0; i < titles0.length; i++) {
//     titles0[i].style.fontSize = "0px";
//   }
//   const years0 = document.getElementsByClassName("year");
//   for (let i = 0; i < years0.length; i++) {
//     years0[i].style.fontSize = "0px";
//   }
//   const genres0 = document.getElementsByClassName("genre");
//   for (let i = 0; i < genres0.length; i++) {
//     genres0[i].style.fontSize = "0px";
//   }
//   const blurbs0 = document.getElementsByClassName("blurb");
//   for (let i = 0; i < blurbs0.length; i++) {
//     blurbs0[i].style.borderBottom = "0px";
//   }
// }
