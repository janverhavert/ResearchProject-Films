import starSystem from '../lib/starSystem';
function Reviews({ titel, discription, score }) {
  Object.assign(this, { titel, discription, score });
}

Reviews.prototype.render = function () {
  return `
  <h3 class="">Reviews</h3>
  <form>
  <div class="form-row">
    
    <div class="mb-3 col-lg-8">
        <label for="titel" class="form-label">Titel</label>
        <input type="text" class="form-control bg-dark text-light" id="titel" placeholder="">
    </div>
    <div class="mb-3 col-lg-2">
        <label for="score" class="form-label">Score</label>
        <input type="text" class="form-control bg-dark text-light" id="score" placeholder="">
    </div>
    <div class="mb-3 col-lg-10">
        <label for="discription" class="form-label">Discription</label>
        <textarea class="form-control bg-dark text-light" id="discription" rows="3"></textarea>
    </div>
    <div class="mb-3 col-lg-5">
    <button type="submit" class="btn c-app-buttons">Submit</button>
    </div>
  </div>
  </form>
<div>
  <hr/>
  <h5 class="c-filmdetail-info-review-titel">Jan Verhavert</h5> <span> -</span>
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
