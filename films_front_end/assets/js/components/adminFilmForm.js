const FilmForm = (data) => {
  document.querySelector('#FilmNaam').value = data.titel;
  document.querySelector('#FilmRegisseur').value = data.director;
  document.querySelector('#FilmDuur').value = data.duur;
  document.querySelector('#FilmDatum').value = data.releaseDatum.slice(0, -1);
  document.querySelector('#FilmType').value = String(data.serie);
  document.querySelector('#FilmGenre').value = data.genres[0].genreId;
  document.querySelector('#FilmDiscription').value = data.discription;
};

export default FilmForm;
