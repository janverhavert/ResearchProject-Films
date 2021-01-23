import Genre from '../components/genreSelect';
import FilmForm from '../components/adminFilmForm';
import filmCRUD from '../components/adminFilmCRUD';
import dataAccess from '../lib/dataAccess';
const adminAdd = async () => {
  const datagenres = await dataAccess.api.get('Genres');
  let genreString = '';
  for (const genre of datagenres) {
    const b = new Genre(genre);
    genreString += b.render();
  }
  if (!genreString == []) {
    document.querySelector('#FilmGenre').innerHTML = genreString;
  } else {
    document.querySelector('#FilmGenre').innerHTML = 'geen genres gevonden';
  }
  var url = window.location.pathname;
  var id = url.substring(url.lastIndexOf('/') + 1);
  const data = await dataAccess.api.get(`Film/${id}`);
  FilmForm(data);

  filmCRUD('PUT');
};
const errorDisplay = (error) => {
  const input = document.querySelectorAll('input').forEach((a) => a.classList.add('is-invalid'));
  //const feedback = document.getElementsByClassName('c-login-feedback');
  document.querySelectorAll('.c-login-feedback').forEach((a) => (a.style.display = 'initial'));
  //feedback.style.display = 'initial';
  input;
};
export default adminAdd;
