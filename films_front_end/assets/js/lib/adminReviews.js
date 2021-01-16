import dataAccess from '../lib/dataAccess';
import AdminReviewsTable from '../components/adminReviewstable';
const admin = async () => {
  await getAdminReviewsData();
  adminDelete();
};

const adminDelete = () => {
  const buttons = document.querySelectorAll('.js-delete');
  for (let i = 0; i < buttons.length; i++) {
    console.log(buttons[i].id);
    buttons[i].onclick = function () {
      console.log(buttons[i].id);
      fetch(`https://localhost:44313/api/Reviews/${buttons[i].id}`, {
        method: 'DELETE',
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
  console.log(data);
  let filmString = '';
  for (const film of data) {
    const b = new AdminReviewsTable(film);
    filmString += b.render();
  }
  if (!filmString == []) {
    document.querySelector('#c-tableReviews').innerHTML = filmString;
  } else {
    document.querySelector('#c-tableReviews').innerHTML = 'geen review gevonden';
  }
};

export default admin;
