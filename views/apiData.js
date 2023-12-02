
var kieranKey = "e2978d1da72adcf778b7bc358679b035";
var t = "totoro";
var requestLink = "http://www.tmdbapi.com/?apikey=" 
+ kieranKey + "&t=" + t;
/* ^ fetch input stuff ^ */

var allInfo = "";

async function getInfo(file) {
    let x = await fetch(file);
    let y = await x.text();
    allInfo = JSON.parse(y);
}

var title;
var poster;
var year;
var description;

async function run(){
    await getInfo(requestLink);
    //console.log(allInfo);
    title = allInfo.Title;
    console.log(title);
    
}

run();

