function Genres({ genreId, genreName }) {
  Object.assign(this, { genreId, genreName });
}

Genres.prototype.render = function () {
  return `
    <option value=${this.genreId}>${this.genreName}</option>
      `;
};

export default Genres;
