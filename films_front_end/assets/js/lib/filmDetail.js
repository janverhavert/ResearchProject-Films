function Film({ filmId, titel }) {
  Object.assign(this, { filmId, titel });
}

Film.prototype.render = function () {
  return `
  <div class="col-sm-12 col-md-5 col-lg-4">
  <img src="<%= rootPath() %>assets/images/Poster.jpg" class="d-block w-100" alt="poster" />
</div>
<div class="col-sm-12 col-md-7 col-lg-8 c-detail-info-div">
  <div class="c-filmsdetail-card-body">
      <div class="c-filmsdetail-card">
      <h2 class="c-filmdetail-title">Avengers</h2>
        <p class="card-text">
          <div class="c-filmsdetail-card-info">
              <span class="c-filmdetail-info-top">2018</span> <span class="c-filmdetail-info-top">127min</span> <span class="c-filmdetail-info-top">Actie,Avontuur</span>
          </div>
        </p>
        <p class="card-text c-filmdetail-info-div">
          <img src="<%= rootPath() %>assets/images/star-full.svg" class="c-filmdetail-star" alt="..." />
          <img src="<%= rootPath() %>assets/images/star-full.svg" class="c-filmdetail-star" alt="..." />
          <img src="<%= rootPath() %>assets/images/star-full.svg" class="c-filmdetail-star" alt="..." />
          <img src="<%= rootPath() %>assets/images/star-full.svg" class="c-filmdetail-star" alt="..." />
          <img src="<%= rootPath() %>assets/images/star-empty.svg" class="c-filmdetail-star" alt="..." />
          <span class="c-filmsdetail-score">8/10</span>
        </p>
        
        <p class="card-text">
          After Thanos, an intergalactic warlord, disintegrates half of the universe, the Avengers must reunite and assemble again to reinvigorate their trounced allies and restore balance.
        </p>
        <p class="card-text c-filmsdetail-card-info" >
          <span class="c-filmdetail-info-top">Regisseur: Christopher nolan </span>
          <span class=""></span>
        </p>

        <div class="c-filmdetail-info-reviews">
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
          <h5 class="c-filmdetail-info-review-titel">Beter dan verwacht</h5>
          <div class="c-filmdetail-info-div">
            <img src="<%= rootPath() %>assets/images/star-full.svg" class="c-filmdetail-star" alt="..." />
            <img src="<%= rootPath() %>assets/images/star-full.svg" class="c-filmdetail-star" alt="..." />
            <img src="<%= rootPath() %>assets/images/star-full.svg" class="c-filmdetail-star" alt="..." />
            <img src="<%= rootPath() %>assets/images/star-full.svg" class="c-filmdetail-star" alt="..." />
            <img src="<%= rootPath() %>assets/images/star-empty.svg" class="c-filmdetail-star" alt="..." />
            <span class="c-filmsdetail-score">8/10</span>
          </div>
          <p class="c-filmsdetail-card-info">After Thanos, an intergalactic warlord, disintegrates half of the universe, the Avengers must reunite and assemble again to reinvigorate their trounced allies and restore balance.</p>
        </div>
        <div>
          <hr/>
          <h5 class="c-filmdetail-info-review-titel">Jan Verhavert</h5> <span> -</span>
          <h5 class="c-filmdetail-info-review-titel">Beter dan verwacht</h5>
          <div class="c-filmdetail-info-div">
            <img src="<%= rootPath() %>assets/images/star-full.svg" class="c-filmdetail-star" alt="..." />
            <img src="<%= rootPath() %>assets/images/star-full.svg" class="c-filmdetail-star" alt="..." />
            <img src="<%= rootPath() %>assets/images/star-full.svg" class="c-filmdetail-star" alt="..." />
            <img src="<%= rootPath() %>assets/images/star-full.svg" class="c-filmdetail-star" alt="..." />
            <img src="<%= rootPath() %>assets/images/star-empty.svg" class="c-filmdetail-star" alt="..." />
            <span class="c-filmsdetail-score">8/10</span>
          </div>
          <p class="c-filmsdetail-card-info">After Thanos, an intergalactic warlord, disintegrates half of the universe, the Avengers must reunite and assemble again to reinvigorate their trounced allies and restore balance.</p>
        </div>
        <div>
          <hr/>
          <h5 class="c-filmdetail-info-review-titel">Jan Verhavert</h5> <span> -</span>
          <h5 class="c-filmdetail-info-review-titel">Beter dan verwacht</h5>
          <div class="c-filmdetail-info-div">
            <img src="<%= rootPath() %>assets/images/star-full.svg" class="c-filmdetail-star" alt="..." />
            <img src="<%= rootPath() %>assets/images/star-full.svg" class="c-filmdetail-star" alt="..." />
            <img src="<%= rootPath() %>assets/images/star-full.svg" class="c-filmdetail-star" alt="..." />
            <img src="<%= rootPath() %>assets/images/star-full.svg" class="c-filmdetail-star" alt="..." />
            <img src="<%= rootPath() %>assets/images/star-empty.svg" class="c-filmdetail-star" alt="..." />
            <span class="c-filmsdetail-score">8/10</span>
          </div>
          <p class="c-filmsdetail-card-info">After Thanos, an intergalactic warlord, disintegrates half of the universe, the Avengers must reunite and assemble again to reinvigorate their trounced allies and restore balance.</p>
        </div>
      </div>
      </div>
    </div>
</div>
    `;
};

export default Film;
