function AdminTable({ filmId, titel, serie, releaseDatum }) {
  Object.assign(this, { filmId, titel, serie, releaseDatum });
}

AdminTable.prototype.render = function () {
  return `
  <tr>
  <th scope="row">${this.filmId}</th>
  <td>${this.titel}</td>
  <td>${this.serie ? 'Serie' : 'Film'}</td>
  <td>${this.releaseDatum}</td>
  <td>
    <div>
        <a href="/adminReviews/${this.filmId}">
        <button class="btn btn-primary  c-table-button c-app-buttons-selected " type="button">
          Reviews
        </button>
        </a>
        <button class="btn btn-primary c-table-button c-app-buttons-selected " type="button">
          Edit
        </button>
      <button class="btn btn-primary c-table-button  c-app-buttons-selected js-delete" type="button" id="${this.filmId}">
        Delete
      </button>
    </div>
  </td>
</tr>
    `;
};

export default AdminTable;
