import Films from '../components/filmCard';
import dataAccess from '../lib/dataAccess';
const dataFilmCard = async (type) => {
  let url = type + '/' + localStorage.getItem('UserId');
  const data = await dataAccess.api.get(url);
  let filmString = '';
  if (data == '[]') {
    document.querySelector('#c-films').innerHTML = `<div class="c-app-empty">Nog geen films toegevoegd</div>`;
  } else {
    for (const watched of data) {
      let filmId = watched.filmId;
      console.log(filmId);
      let api = `Film/${filmId}`;
      const film = await dataAccess.api.get(api);
      console.log(film);
      const b = new Films(film);
      filmString += b.render();
    }
    document.querySelector('#c-films').innerHTML = filmString;
  }
};

export default dataFilmCard;
