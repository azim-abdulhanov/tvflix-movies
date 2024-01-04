'use strict';

const api_key = '3ec9f08d3406d96d2269c668a4b512c6';
const imageBaseURL = 'https://image.tmdb.org/t/p/';

const fetchDataFromServer = function (url, callback, optionalParam) {
  fetch(url)
    .then(response => response.json())
    .then(data => callback(data, optionalParam));
};

export { imageBaseURL, api_key, fetchDataFromServer };
