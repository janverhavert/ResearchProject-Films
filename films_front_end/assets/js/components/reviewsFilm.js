import starSystem from '../lib/starSystem';
function Reviews({ titel, userName, discription, score }) {
  Object.assign(this, { titel, userName, discription, score });
}

Reviews.prototype.render = function () {
  return `

<div>
  <hr/>
  <h5 class="c-filmdetail-info-review-titel">${this.userName}</h5> <span> -</span>
  <h5 class="c-filmdetail-info-review-titel">${this.titel}</h5>
  <div class="c-filmdetail-info-div">
  ${starSystem(this.score)}
    <span class="c-filmsdetail-score">${'&nbsp;- ' + this.score + '/10'}</span>
  </div>
  <p class="c-filmsdetail-card-info">${this.discription}</p>
</div>
      `;
};

export default Reviews;
