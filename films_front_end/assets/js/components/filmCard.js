function Films({ filmId, titel, posterUrl }) {
  Object.assign(this, { filmId, titel, posterUrl });
}

Films.prototype.render = function () {
  return `
  <div class="col-sm-6 col-md-1 col-lg-1 c-app-col">
    <a href="/film/${this.filmId}">
        <div class="card c-card-div text-center pl-0">
            <div class="card-body c-card-body">
                <img src="http://image.tmdb.org/t/p/w500${this.posterUrl}" class="d-block w-100 c-card-img" alt="..." />
                <h7 class="card-title  c-card-title">
                ${this.titel}
                </h7>
            </div>
        </div>
    </a>
</div>
  `;
};

export default Films;
