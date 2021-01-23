import starSystem from '../lib/starSystem';
function UserReviews({ filmId, titel, filmTitel, discription, score, dateOfCreation, posterUrl }) {
  Object.assign(this, { filmId, titel, filmTitel, discription, score, dateOfCreation, posterUrl });
}

UserReviews.prototype.render = function () {
  return `
  <a href="/film/${this.filmId}">
  <div class="card mb-3 c-reviews bg-dark text-light">
  <div class="row g-0">
  <div class="col-md-2">
    <img src="http://image.tmdb.org/t/p/w500${this.posterUrl}" class="c-reviews-review-img" alt="poster" />
  </div>
  <div class="col-md-10">
    <div class="card-body c-review-card">
      <div>
        <h5 class="card-title c-profiel-review-titel">${this.filmTitel} - ${this.titel.charAt(0).toUpperCase() + this.titel.slice(1)}</h5>
        <p class="card-text c-filmdetail-info-div">
            ${starSystem(this.score)}
          <span class="c-filmsdetail-score">${'&nbsp;- ' + this.score + '/10'}</span>
        </p>
        </div>

      <p class="card-text">${this.discription}</p>
      <p class="card-text"><small class="">${this.dateOfCreation.toString().split('T')[0]}</small></p>
    </div>
  </div>
</div>
</div>
</a>
    `;
};

export default UserReviews;
