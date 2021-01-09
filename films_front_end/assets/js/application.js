require('expose-loader?$!expose-loader?jQuery!jquery');
require('bootstrap/dist/js/bootstrap.bundle.js');
require('@fortawesome/fontawesome-free/js/all.js');
require('babel-core/register');
require('babel-polyfill');
import dataAccess from './lib/dataAccess';

document.addEventListener('DOMContentLoaded', async function () {
  let url = `https://localhost:44313/api/Films`;
  const data = await dataAccess.api.get(url);
  console.log(data);

  let bookString = '';
  for (const book of data) {
    const b = new Book(book);
    bookString += b.render();
  }
  if (!bookString == '') {
    document.querySelector('c-books').innerHTML = bookString;
  } else {
    document.querySelector('c-books').innerHTML = 'geen book gevonden';
  }
});
