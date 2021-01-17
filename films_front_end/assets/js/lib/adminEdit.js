import Genre from '../components/genreSelect';
import FilmForm from '../components/adminFilmForm';
import dataAccess from '../lib/dataAccess';
const adminAdd = async () => {
  const datagenres = await dataAccess.api.get('Genres');
  console.log(datagenres);
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
  const data = await dataAccess.api.get(`film/${id}`);
  console.log(data);
  FilmForm(data);

  document.getElementById('Edit').onclick = function () {
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
    // Default options are marked with *
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Cookie',
      '.AspNetCore.Identity.Application=CfDJ8D-8YdoiRIlArtTCfwZ0lkv9wshkXE7FKhyogkhvZSAT7Ey3lLz6lGF-YyK34wI6j4kVAUOFePVLj9iFSMVAFYA-bXJQDLVN6EU8ShaumsEzEucaD7Z6rym886iRV6V1gDy97Xg0fmzTJWAZi8RCK65eMKz-tfqC5ic9Dob7oine58WjMjOX-a_lMMZ8R5dthvZIWVazDZocuoEQacslLzrMP3OKHkEdL3NZjqVMKnklrNt3LEhsa5oEp74dewW4UQPoHj-td9e0URFGwEKw2PsQM7NB2L0qwBzYHnbBqIUi6wbE7sifmWo_49pIoC_W8l3HOgOc4OmcHJASDnX1dmXKKEuUMemjesweDvOKZPCY6UqjLt5CZY-6HC3IuhEb4fIvPtMe1Aj2rIa6ZXvgYogLNZHbmts9M2uB1PZ4I7kWfVdLiRvF8lr8ig8TsF_EmzZg8lMY49gQLlke3h4PDdnfyB3CR1I7laFgfszfBQ1hubUYfToDcgtqzLLeqOGLoYhIUCh3luWdmB9Cvs-YJ0LvUqid8w58AhuSBfTPDVYzNj0fYtH0KM0nJVx_7_WG3ThcB6HHvK6qpje2Nvchuwx1iy6RfUO1Lek4NKavzxBKVNjMR4guz_4m3b_RGjUNzdTtvh_tVqmO2guOncXj4LZdn4EW8C-E-A-I00_TUCVF_z2rvs7npg5dedV6Ws2VY9jq484UutVY3T-Sr157JUm1jUo6YCTLy8XZp2rqLJqojZoD5CxqTmrQV6E6zI9LMWQeyX9KHsd2IAXCQuXV24SyNkfMaDCg4ZQv1IUIMLtxIUsDKoayDZWqQkBMKhLGZjJA-3u6WPnwk82zaqMwltBz9sxNLLkQpqjaw4z0o6f2'
    );
    var formData = JSON.stringify({ filmId: id, titel: naam, director: regisseur, releaseDatum: datum, genres: [{ genreId: genreId, genreNaam: genreNaam }], serie: typeBool, duur: parseInt(duur), discription: discription });
    console.log(JSON.parse(formData));
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: formData,
      redirect: 'follow',
    };

    fetch('https://localhost:44313/api/Edit', requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => errorDisplay(error));
  };
};

export default adminAdd;
