const filmCRUD = (action) => {
  document.getElementById(action).onclick = function () {
    var naam = document.getElementById('FilmNaam').value;

    var regisseur = document.getElementById('FilmRegisseur').value;
    var datum = document.getElementById('FilmDatum').value;
    var genreSelect = document.getElementById('FilmGenre');
    var genreId = genreSelect.value;
    var genreNaam = genreSelect.options[genreSelect.selectedIndex].text;
    var type = document.getElementById('FilmType').value;
    var duur = document.getElementById('FilmDuur').value;
    var discription = document.getElementById('FilmDiscription').value;
    console.log(datum);
    var filmID = document.querySelector('.js-titel').id;
    if (action == 'POST') {
      var formData = JSON.stringify({ titel: naam, director: regisseur, duur: parseInt(duur), type: type, discription: discription, genres: [{ genreId: genreId, genreName: genreNaam }], releaseDatum: datum + 'Z' });
    } else if (action == 'PUT') {
      var posterfullurl = document.getElementById('FilmPoster').src;
      var posterurl = posterfullurl.substring(posterfullurl.lastIndexOf('/') + 1);
      console.log(posterurl);
      var formData = JSON.stringify({ filmId: filmID, titel: naam, director: regisseur, duur: parseInt(duur), posterUrl: '/' + posterurl, type: type, discription: discription, genres: [{ genreId: genreId, genreName: genreNaam }], releaseDatum: datum + 'Z' });
    }

    var formDataNew = JSON.parse(formData);
    console.log(formData);
    if (!formDataNew.titel == '' || !formDataNew.director == '' || !formDataNew.duur == 0 || !formDataNew.discription == '') {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('X-CSRF-Token', document.getElementsByName('csrf-token')[0].content);
      console.log(action);
      var requestOptions = {
        method: action,
        headers: myHeaders,
        body: formData,
      };
      if (action == 'POST') {
        fetch('http://127.0.0.1:3000/api/Film/', requestOptions)
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => errorDisplay(error));
      } else if (action == 'PUT') {
        fetch(`http://127.0.0.1:3000/api/Film/${filmID}`, requestOptions)
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => errorDisplay(error));
      }
    } else {
      errorDisplay();
    }

    // Default options are marked with *
  };
};

const errorDisplay = (error) => {
  const input = document.querySelectorAll('input').forEach((a) => a.classList.add('is-invalid'));
  //const feedback = document.getElementsByClassName('c-login-feedback');
  document.querySelectorAll('.c-login-feedback').forEach((a) => (a.style.display = 'initial'));
  //feedback.style.display = 'initial';
  input;
};
export default filmCRUD;
