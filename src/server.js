// Modules used
const express = require('express');
const axios = require('axios');
const hbs = require('hbs');

const app = express();

// Views directory
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views/pages');
app.use(express.static(__dirname));

// Register partials
hbs.registerPartials(__dirname + '/views/partials');

// Youtube API search request
const youtubeQuery = function(query, callback) {
  axios.get('https://www.googleapis.com/youtube/v3/search', {
    params: {
      'key': 'AIzaSyDo9vfY5tEflLIbRSOcfSFpV1hb5aoKoZ0',
      'maxResults': '25',
      'part': 'snippet',
      'q': query,
      'type': ''
    }
  })
  .then(function (response) {
    callback(response);
  })
  .catch(function (error) {
    console.log(error);
    callback(error);
  })
};

//Get request for Home pages
app.get('/home', (req, res) => {
  console.log('Welcome to Youtube');
  res.render('home');
})

// Get request for Search page
app.get('/search/:userQuery', (req, res) => {
  console.log('Searching Youtube now');
  const userQuery = req.params.userQuery;

  // Youtube API search request
  youtubeQuery(userQuery, response => {
    const youtubeResultsObject = response.data.items;
    const searchResults = [];

    // Create new search results object with only required properties
    for (var i = 0; i < youtubeResultsObject.length; i++) {
      searchResults[i] = {
        url: youtubeResultsObject[i].snippet.thumbnails.medium.url,
        title: youtubeResultsObject[i].snippet.title,
        description: youtubeResultsObject[i].snippet.description,
        postDate: youtubeResultsObject[i].snippet.publishedAt,
        vid: youtubeResultsObject[i].id.videoId
      }
    }
    res.render('search', {
      searchResults,
      userQuery
    })
  })
})

// Get request to load video from search results list
app.get('/videoplayer/:userQuery/:videoId', (req, res) => {
  console.log('Loading video now');
  const userQuery = req.params.userQuery;
  const videoId = req.params.videoId;
  res.render('videoplayer', {
    userQuery,
    videoId
  });
})

// Get request to load video with only video ID
app.get('/videoplayer/:videoId', (req, res) => {
  console.log('Loading video now');
  const videoId = req.params.videoId;
  res.render('videoplayer', {
    videoId
  });
})

app.listen(3000);
