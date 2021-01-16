import dataAccess from '../lib/dataAccess';
import AdminTable from '../components/admintable';
import AdminReviewsTable from '../components/adminReviewstable';
const admin = async () => {
  await getAdminData();
  adminDelete();
};

const adminDelete = () => {
  const buttons = document.querySelectorAll('.js-delete');
  for (let i = 0; i < buttons.length; i++) {
    console.log(buttons[i].id);
    buttons[i].onclick = function () {
      console.log(buttons[i].id);
      fetch(`https://localhost:44313/api/Films/${buttons[i].id}`, {
        method: 'DELETE',
      })
        .then((response) => window.alert('film is verwijderd'))
        .then(location.reload());
    };
  }
};

const getAdminData = async () => {
  const data = await dataAccess.api.get('All');
  console.log(data);
  let filmString = '';
  for (const film of data) {
    const b = new AdminTable(film);
    filmString += b.render();
  }
  if (!filmString == []) {
    document.querySelector('#c-table').innerHTML = filmString;
  } else {
    document.querySelector('#c-table').innerHTML = 'geen film gevonden';
  }
};

export default admin;
