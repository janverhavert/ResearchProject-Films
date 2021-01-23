import dataAccess from '../lib/dataAccess';
import AdminReviewsTable from '../components/adminReviewstable';
const admin = async () => {
  await getAdminReviewsData();
  adminDelete();
};

const adminDelete = () => {
  const buttons = document.querySelectorAll('.js-delete');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {
      var myHeaders = new Headers();
      //myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('X-CSRF-Token', document.getElementsByName('csrf-token')[0].content);
      fetch(`http://127.0.0.1:3000/api/Reviews/${buttons[i].id}`, {
        method: 'DELETE',
        headers: myHeaders,
      })
        .then((response) => window.alert('Review is verwijderd'))
        .then(location.reload());
    };
  }
};

const getAdminReviewsData = async () => {
  var url = window.location.pathname;
  var id = url.substring(url.lastIndexOf('/') + 1);
  const data = await dataAccess.api.get(`films/Reviews/${id}`);
  let filmString = '';
  if (data == '[]') {
    document.querySelector('#c-tableReviews').innerHTML = 'geen reviews gevonden';
  } else {
    for (const film of data) {
      const b = new AdminReviewsTable(film);
      filmString += b.render();
    }
    document.querySelector('#c-tableReviews').innerHTML = filmString;
  }
};

export default admin;
