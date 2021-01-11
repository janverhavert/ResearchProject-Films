require('expose-loader?$!expose-loader?jQuery!jquery');
require('bootstrap/dist/js/bootstrap.bundle.js');
require('@fortawesome/fontawesome-free/js/all.js');
require('babel-core/register');
require('babel-polyfill');

import dataFilmCard from './lib/dataFilmCard';
import dataFilmDetail from './lib/dataFilmDetail';
import login from './lib/login';
import header from './lib/header';
document.addEventListener('DOMContentLoaded', async function () {
  header();
  if (window.location.href == 'http://127.0.0.1:3000/') {
    dataFilmCard('Films');
  } else if (window.location.href == 'http://127.0.0.1:3000/series') {
    dataFilmCard('Series');
  } else if (window.location.href.includes('http://127.0.0.1:3000/film')) {
    dataFilmDetail();
  } else if (window.location.href.includes('http://127.0.0.1:3000/login')) {
    document.getElementById('login').onclick = function () {
      login();
    };
  }
});
