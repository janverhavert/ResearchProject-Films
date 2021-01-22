require('expose-loader?$!expose-loader?jQuery!jquery');
//require('@popperjs/core/dist/cjs/popper');
//require('bootstrap/dist/js/bootstrap.bundle.min.js');
require('@fortawesome/fontawesome-free/js/all.js');
require('babel-core/register');
require('babel-polyfill');

import dataFilmCard from './lib/dataFilmCard';
import dataFilmDetail from './lib/dataFilmDetail';
import dataWatched from './lib/dataWatched';
import bar from './lib/bar';
import login from './lib/login';
import registreren from './lib/registreren';
import profiel from './lib/profiel';
import header from './lib/header';
import admin from './lib/admin';
import adminAdd from './lib/adminAdd';
import adminEdit from './lib/adminEdit';
import adminReviews from './lib/adminReviews';

document.addEventListener('DOMContentLoaded', async function () {
  header();
  var url = 'http://127.0.0.1:3000';

  if (window.location.href == url + '/') {
    document.querySelector('#c-filmheader').className = 'nav-link active';
    dataFilmCard('Films');
    bar('Films');
  } else if (window.location.href == url + '/series') {
    document.querySelector('#c-serie').className = 'nav-link active';
    dataFilmCard('Series');
    bar('Series');
  } else if (window.location.href == url + '/watched') {
    document.querySelector('#c-watch').className = 'nav-link active';
    dataWatched('Watched');
  } else if (window.location.href == url + '/adminAdd') {
    adminAdd();
  } else if (window.location.href.includes(url + '/adminEdit')) {
    adminEdit();
  } else if (window.location.href == url + '/profiel') {
    if (localStorage.getItem('UserRole') == 'Admin' || localStorage.getItem('UserRole') == 'Customer') {
      profiel();
    } else {
      window.location.href = '/';
    }
  } else if (window.location.href.includes(url + '/film')) {
    dataFilmDetail();
  } else if (window.location.href.includes(url + '/adminReviews')) {
    adminReviews();
  } else if (window.location.href.includes(url + '/admin')) {
    admin();
  } else if (window.location.href.includes(url + '/login')) {
    document.getElementById('login').onclick = function () {
      login();
    };
  } else if (window.location.href.includes(url + '/registreren')) {
    document.getElementById('registreren').onclick = function () {
      registreren();
    };
  }
});
