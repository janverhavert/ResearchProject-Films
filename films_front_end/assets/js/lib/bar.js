import Genre from '../components/genreDropdown';
import Films from '../components/filmCard';
import dataAccess from '../lib/dataAccess';
const bar = async () => {
  const data = await dataAccess.api.get('Genres');
  console.log(data);
  let filmString = '';
  for (const film of data) {
    const b = new Genre(film);
    filmString += b.render();
  }
  if (!filmString == '') {
    document.querySelector('#c-categorieen').innerHTML = filmString;
  } else {
    document.querySelector('c-films').innerHTML = 'geen films gevonden';
  }

  const input = document.querySelector('input');
  input.addEventListener('change', updateValue);
  async function updateValue(e) {
    let urlValue = e.target.value;
    let url = `films/${urlValue}`;
    const data = await dataAccess.api.get(url);
    console.log(data);

    let filmString = '';
    for (const film of data) {
      const b = new Films(film);
      filmString += b.render();
    }
    if (!filmString == '') {
      document.querySelector('#c-films').innerHTML = filmString;
    } else {
      document.querySelector('c-books').innerHTML = 'geen book gevonden';
    }
  }
};

export default bar;
