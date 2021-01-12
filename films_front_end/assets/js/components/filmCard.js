function Films({ filmId, titel }) {
  Object.assign(this, { filmId, titel });
}

Films.prototype.render = function () {
  return `
  <div class="col-sm-6 col-md-1 col-lg-1 c-app-col">
    <a href="/film/${this.filmId}">
        <div class="card c-card-div text-center pl-0">
            <div class="card-body c-card-body">
                <img src="https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/1280x1280/products/89058/93685/Joker-2019-Final-Style-steps-Poster-buy-original-movie-posters-at-starstills__62518.1572351179.jpg?c=2?imbypass=on" class="d-block w-100 c-card-img" alt="..." />
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
