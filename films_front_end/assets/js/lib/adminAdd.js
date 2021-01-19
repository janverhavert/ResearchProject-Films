import Genre from '../components/genreSelect';
import dataAccess from '../lib/dataAccess';
import filmCRUD from '../components/adminFilmCRUD';
const adminAdd = async () => {
  const data = await dataAccess.api.get('Genres');
  console.log(data);
  let filmString = '';
  for (const genre of data) {
    const b = new Genre(genre);
    filmString += b.render();
  }
  if (!filmString == []) {
    document.querySelector('#FilmGenre').innerHTML = filmString;
  } else {
    document.querySelector('#FilmGenre').innerHTML = 'geen genres gevonden';
  }

  filmCRUD('POST');
};
export default adminAdd;
