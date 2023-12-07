const fetch = require('node-fetch');
require('dotenv').config()

var recs
recs = getRecommendation(49022)

async function getRecommendation(movieID) {

  /* Getting Current Recs for User from API */
    const url = 'https://api.themoviedb.org/3/movie/' + movieID + '/recommendations?language=en-US&page=1';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: process.env.TMBD_API_KEY
       
      }
    };

    fetch(url, options)
        .then(res => res.json())
        .then(json => {
            // console.log(json)
            var currentRecs = [];
            var data = json.results;
            data.forEach((item) => {
                currentRecs.push(item.title);
            });

            console.log(currentRecs)
        })
        .catch(err => console.error('error:' + err))

        
    // var data;
    // const returnStuff = async () => {
    //     data = await info;
    //     console.log("about to print")
    //     // console.log(data)
    //     return data
    // }

    // data = await returnStuff;
    // // console.log (data)

    // return data;


   

    // console.log(data)
    // return await data
   
}

/* Searching for movie */
async function searchMovie(key) {
  const url = 'https://api.themoviedb.org/3/search/movie?query='+ key + '&include_adult=false&language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTMzYmUwNTdhYjMxOTJjMWEyNTQyYTEyZWU5YTFlNCIsInN1YiI6IjY1NmY0ZWIxMDg1OWI0MDEzOTUzNWJmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rbNhIQ_fM_lX8m2UgPb2jenhB2j7Z_g0b_A7rLxav-w'
    }
  };
  
  fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));

}

