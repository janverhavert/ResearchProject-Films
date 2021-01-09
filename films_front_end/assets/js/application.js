require('expose-loader?$!expose-loader?jQuery!jquery');
require('bootstrap/dist/js/bootstrap.bundle.js');
require('@fortawesome/fontawesome-free/js/all.js');
require('babel-core/register');
require('babel-polyfill');
import dataAccess from './lib/dataAccess';
import Film from './lib/filmCard';
document.addEventListener('DOMContentLoaded', async function () {
  if (window.location.href == 'http://127.0.0.1:3000/') {
    let url = `https://localhost:44313/api/Films`;
    const data = await dataAccess.api.get(url);
    console.log(data);

    let filmString = '';
    for (const film of data) {
      const b = new Film(film);
      filmString += b.render();
    }
    if (!filmString == '') {
      document.querySelector('#c-film').innerHTML = filmString;
    } else {
      document.querySelector('c-film').innerHTML = 'geen films gevonden';
    }
  }
});
