function Genres({ genreId, genreNaam }) {
  Object.assign(this, { genreId, genreNaam });
}

Genres.prototype.render = function () {
  return `
  <li><button class="dropdown-item text-light bg-dark c-dropdown-item" type="button" id="${this.genreId}">${this.genreNaam}</button></li>
    `;
};

export default Genres;
