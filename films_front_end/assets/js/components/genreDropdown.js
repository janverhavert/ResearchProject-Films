function Genres({ genreId, genreName }) {
  Object.assign(this, { genreId, genreName });
}

Genres.prototype.render = function () {
  return `
  <li><button class="dropdown-item text-light bg-dark c-dropdown-item" type="button" id="${this.genreId}">${this.genreName}</button></li>
    `;
};

export default Genres;
