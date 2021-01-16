function AdminReviewsTable({ filmId, titel, userName, dateOfCreation }) {
  Object.assign(this, { filmId, titel, userName, dateOfCreation });
}

AdminReviewsTable.prototype.render = function () {
  return `
    <tr>
    <th scope="row">${this.filmId}</th>
    <td>${this.userName}</td>
    <td>${this.titel}</td>
    <td>${this.dateOfCreation}</td>
    <td>
      <div>
        <button class="btn btn-primary c-table-button  c-app-buttons-selected js-delete" type="button" id="${this.filmId}">
          Delete
        </button>
      </div>
    </td>
  </tr>
      `;
};

export default AdminReviewsTable;
