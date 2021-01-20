import Genre from '../components/genreDropdown';
import dataGet from '../lib/dataGet';
import dataAccess from '../lib/dataAccess';

const bar = async (type) => {
  const data = await dataAccess.api.get('Genres');
  let filmString = '';
  if (data == '[]') {
    document.querySelector('#c-categorieen').innerHTML = 'Geen genres gevonden';
  } else {
    for (const film of data) {
      const b = new Genre(film);
      filmString += b.render();
    }
    document.querySelector('#c-categorieen').innerHTML = filmString;
  }

  const input = document.querySelector('input');

  input.addEventListener('change', function () {
    dataGet.call(this, type + '/' + input.value);
  });

  const genres = document.querySelectorAll('.c-dropdown-item');

  for (const genre of genres) {
    genre.onclick = function () {
      dataGet.call(this, type + '/genre/' + genre.id);
    };
  }
};

export default bar;
