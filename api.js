const fetch = require('node-fetch');
require('dotenv').config()
const mongoose = require('mongoose');




async function getRecommendation(movieID, user) {

  /* Getting Current Recs for User from API */
    const url = 'https://api.themoviedb.org/3/movie/' + movieID + '/recommendations?language=en-US&page=1';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: process.env.TMBD_API_KEY
       
      }
    };
    var currentRecs = user.recs

    var data = await fetch(url, options)
        .then(res => res.json())
        .then(json => {
            // console.log(json)
            var data = json.results;
            data.forEach( async (item) => {
                currentRecs.push(await item.title);
            });

            return currentRecs
        })
        .catch(err => console.error('error:' + err))
    
    // console.log(data)
    return data

}

/* Searching for movie */
async function searchMovie(key) {
  const url = 'https://api.themoviedb.org/3/search/movie?query='+ key + '&include_adult=false&language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: TMBD_API_KEY
    }
  };
  
  return await fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));

    
}

