//import image from '../../images/Poster.jpg';
function Reviews({ titel, discription, score }) {
  Object.assign(this, { titel, discription, score });
}

Reviews.prototype.render = function () {
  return `
  <h3 class="c-filmdetail-title">Reviews</h3>
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
    <span class="c-filmsdetail-score">${this.score}/10</span>
  </div>
  <p class="c-filmsdetail-card-info">${this.discription}</p>
</div>
      `;
};

export default Reviews;
