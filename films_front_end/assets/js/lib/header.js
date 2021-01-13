const header = () => {
  if (localStorage.getItem('UserRole') == 'Admin' || localStorage.getItem('UserRole') == 'Customer') {
    var htmlHeaderRechts = `<a href="/profiel">
    <button class="btn btn-dark" type="submit">${localStorage.getItem('UserName')}</button>
  </a>
  <a href="/">
    <button class="btn btn-outline-success c-app-buttons" type="submit" id="logout">logout</button>
  </a>
    `;

    var htmlWatched = '<a class="nav-link" href="/watched" id="c-watch">Watched list</a>';
    document.querySelector('#c-user').innerHTML = htmlHeaderRechts;
    document.querySelector('#c-watched').innerHTML = htmlWatched;

    if (localStorage.getItem('UserRole') == 'Admin') {
      var htmlAdmin = '<a class="nav-link" href="/admin">Admin</a>';
      document.querySelector('#c-admin').innerHTML = htmlAdmin;
    }

    document.getElementById('logout').onclick = function () {
      localStorage.removeItem('UserId');
      localStorage.removeItem('UserRole');
      localStorage.removeItem('UserName');
      window.location.href = '/';
    };
  } else {
    var htmlHeaderRechts = ` <a href="/login">
    <button class="btn btn-dark" type="submit">Inloggen</button>
  </a>
  <a href="/registreren">
    <button class="btn btn-outline-success c-app-buttons" type="submit">Registeren</button>
  </a>
    `;
    document.querySelector('#c-user').innerHTML = htmlHeaderRechts;
  }
};
export default header;
