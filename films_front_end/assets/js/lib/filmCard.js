function Book({ title, isbn, publish_date, author_name }) {
  Object.assign(this, { title, isbn, publish_date, author_name });
}

Book.prototype.render = function () {
  return `
  <div class="col-sm-6 col-md-1 col-lg-1 c-app-col">
    <a href="/filmdetail">
        <div class="card c-card-div text-center pl-0">
            <div class="card-body c-card-body">
                <img src="<%= rootPath() %>assets/images/Poster.jpg" class="d-block w-100 c-card-img" alt="..." />
                <h7 class="card-title  c-card-title">
                Avengers
                </h7>
            </div>
        </div>
    </a>
</div>
  `;
};

export default Book;
