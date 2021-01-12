import starSystem from '../lib/starSystem';
function Film({ filmId, titel, director, discription, duur, genres, releaseDatum, avg, reviews }) {
  Object.assign(this, { filmId, titel, director, discription, duur, genres, releaseDatum, avg, reviews });
}

Film.prototype.render = function () {
  return `
  <div class="col-sm-12 col-md-5 col-lg-3">
        <img src="https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/1280x1280/products/89058/93685/Joker-2019-Final-Style-steps-Poster-buy-original-movie-posters-at-starstills__62518.1572351179.jpg?c=2?imbypass=on" class="d-block w-100 c-film-img" alt="poster" />
    </div>
    <div class="col-sm-12 col-md-7 col-lg-9 c-detail-info-div text-light">
      <div class="c-filmsdetail-card-body">
        <div class="c-filmsdetail-card">
          <h2 class="c-filmdetail-title">${this.titel}</h2>
          <p class="card-text">
            <div class="c-filmsdetail-card-info">
              <span class="c-filmdetail-info-top">${this.releaseDatum.toString().split('T')[0]}</span> <span class="c-filmdetail-info-top">${this.duur} min</span> <span class="c-filmdetail-info-top">${this.genres[0].genreNaam + ',' + this.genres[1].genreNaam}</span>
            </div>
          </p>
          <p class="card-text c-filmdetail-info-div">
          ${starSystem(this.avg)}
            <span class="c-filmsdetail-score">${this.avg ? '&nbsp;- ' + this.avg + '/10' : 'Nog geen reviews'}</span>
          </p>
          <p class="card-text">
            ${this.discription}
          </p>
          <p class="card-text c-filmsdetail-card-info" >
            <span class="c-filmdetail-info-top">Regisseur: ${this.director}  </span>
            <span class=""></span>
          </p>       
        </div>
      </div>
    </div>
  </div>
    `;
};

export default Film;
