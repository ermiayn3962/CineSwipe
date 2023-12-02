
var kieranKey = "8ea8d568";
var t = "totoro";
var requestLink = "http://www.omdbapi.com/?apikey=" 
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
    var title2 = allInfo.Title;
    console.log(title2);
    
}

run();

