import Films from '../components/filmCard';
import dataAccess from '../lib/dataAccess';
const dataFilmCard = async (type) => {
  let url = type + '/' + localStorage.getItem('UserId');

  const data = await dataAccess.api.get(url);
  console.log(data);

  let filmString = '';
  for (const watched of data) {
    let filmId = watched.filmId;
    console.log(filmId);
    let api = `film/${filmId}`;
    const film = await dataAccess.api.get(api);
    console.log(film);
    const b = new Films(film);
    filmString += b.render();
  }
  if (!filmString == '') {
    document.querySelector('#c-films').innerHTML = filmString;
  } else {
    document.querySelector('c-films').innerHTML = 'geen films gevonden';
  }
};

export default dataFilmCard;
