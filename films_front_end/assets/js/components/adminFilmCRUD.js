const filmCRUD = (action) => {
  document.getElementById(action).onclick = function () {
    var naam = document.getElementById('FilmNaam').value;
    var regisseur = document.getElementById('FilmRegisseur').value;
    var datum = document.getElementById('FilmDatum').value;
    var genreSelect = document.getElementById('FilmGenre');
    var genreId = genreSelect.value;
    var genreNaam = genreSelect.options[genreSelect.selectedIndex].text;
    var type = document.getElementById('FilmType').value;
    var typeBool = type == 'true';
    var duur = document.getElementById('FilmDuur').value;
    var discription = document.getElementById('FilmDiscription').value;
    var formData = JSON.stringify({ titel: naam, director: regisseur, duur: parseInt(duur), serie: typeBool, discription: discription, genres: [{ genreId: genreId, genreName: genreNaam }], releaseDatum: datum });
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

      fetch('http://127.0.0.1:3000/api/Film/', requestOptions)
        .then((response) => response.text())
        .then((result) => (window.location.href = '/admin'))
        .catch((error) => errorDisplay(error));
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
