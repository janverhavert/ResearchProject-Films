import Genre from '../components/genreDropdown';
import dataAccess from '../lib/dataAccess';
import Films from '../components/filmCard';
const bar = async (type) => {
  const data = await dataAccess.api.get('Genres');
  let filmString = '';
  if (data == null) {
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
const dataGet = async (link) => {
  const data = await dataAccess.api.get(link);
  let filmString = '';
  if (data == null) {
    document.querySelector('#c-films').innerHTML = '<div class="c-app-empty">Geen films gevonden</div>';
  } else {
    for (const film of data) {
      const b = new Films(film);

      filmString += b.render();
    }
    document.querySelector('#c-films').innerHTML = filmString;
  }
};
export default bar;
