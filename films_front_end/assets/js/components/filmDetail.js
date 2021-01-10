//import image from '../../images/Poster.jpg';
function Film({ filmId, titel, director, discription, duur, genres, releaseDatum, avg, reviews }) {
  Object.assign(this, { filmId, titel, director, discription, duur, genres, releaseDatum, avg, reviews });
}

Film.prototype.render = function () {
  return `
  <div class="col-sm-12 col-md-5 col-lg-4">
        <img src="" class="d-block w-100" alt="poster" />
    </div>
    <div class="col-sm-12 col-md-7 col-lg-8 c-detail-info-div text-light">
      <div class="c-filmsdetail-card-body">
        <div class="c-filmsdetail-card">
          <h2 class="c-filmdetail-title">${this.titel}</h2>
          <p class="card-text">
            <div class="c-filmsdetail-card-info">
              <span class="c-filmdetail-info-top">${this.releaseDatum.toString().split('T')[0]}</span> <span class="c-filmdetail-info-top">${this.duur} min</span> <span class="c-filmdetail-info-top">${this.genres[0].genreNaam + ',' + this.genres[1].genreNaam}</span>
            </div>
          </p>
          <p class="card-text c-filmdetail-info-div">
          <svg class='c-filmdetail-star' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" xml:space="preserve">
          <polygon class="st0" points="405.47,490.98 250.6,377.41 96.77,492.38 154.89,307.22 0.02,193.65 190.8,192.78 248.92,7.62 
            308.72,192.25 499.5,191.38 345.67,306.35 "/>
          </svg>
          <svg class='c-filmdetail-star' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" xml:space="preserve">
          <polygon class="st0" points="405.47,490.98 250.6,377.41 96.77,492.38 154.89,307.22 0.02,193.65 190.8,192.78 248.92,7.62 
            308.72,192.25 499.5,191.38 345.67,306.35 "/>
          </svg> <svg class='c-filmdetail-star' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" xml:space="preserve">
          <polygon class="st0" points="405.47,490.98 250.6,377.41 96.77,492.38 154.89,307.22 0.02,193.65 190.8,192.78 248.92,7.62 
            308.72,192.25 499.5,191.38 345.67,306.35 "/>
          </svg> <svg class='c-filmdetail-star' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" xml:space="preserve">
          <polygon class="st0" points="405.47,490.98 250.6,377.41 96.77,492.38 154.89,307.22 0.02,193.65 190.8,192.78 248.92,7.62 
            308.72,192.25 499.5,191.38 345.67,306.35 "/>
          </svg>
          <svg class='c-filmdetail-star' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" xml:space="preserve">
          <polygon class="st0" points="405.47,490.98 250.6,377.41 96.77,492.38 154.89,307.22 0.02,193.65 190.8,192.78 248.92,7.62 
            308.72,192.25 499.5,191.38 345.67,306.35 "/>
          </svg>
            <span class="c-filmsdetail-score">${this.avg}/10</span>
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
