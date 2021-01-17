function Genres({ genreId, genreNaam }) {
  Object.assign(this, { genreId, genreNaam });
}

Genres.prototype.render = function () {
  return `
    <option value=${this.genreId}>${this.genreNaam}</option>
      `;
};

export default Genres;
