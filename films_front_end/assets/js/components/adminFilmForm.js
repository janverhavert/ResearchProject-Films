const FilmForm = (data) => {
  document.querySelector('#FilmPoster').src = 'http://image.tmdb.org/t/p/w500' + data.posterUrl;

  document.querySelector('.js-titel').innerHTML = data.titel;
  document.querySelector('.js-titel').id = data.filmId;
  document.querySelector('#FilmNaam').value = data.titel;
  document.querySelector('#FilmRegisseur').value = data.director;
  document.querySelector('#FilmDuur').value = data.duur;
  document.querySelector('#FilmDatum').value = data.releaseDatum.slice(0, -1);
  document.querySelector('#FilmType').value = data.type;
  document.querySelector('#FilmGenre').value = data.genres[0].genreId;
  document.querySelector('#FilmDiscription').value = data.discription;
};

export default FilmForm;
