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
      var myHeaders = new Headers();
      //myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('X-CSRF-Token', document.getElementsByName('csrf-token')[0].content);
      fetch(`http://127.0.0.1:3000/api/Films/${buttons[i].id}`, {
        method: 'DELETE',
        headers: myHeaders,
      })
        .then((response) => window.alert('film is verwijderd'))
        .then(location.reload());
    };
  }
};

const getAdminData = async () => {
  const data = await dataAccess.api.get('All');
  let filmString = '';
  if (data == '[]') {
    document.querySelector('#c-table').innerHTML = 'geen film gevonden';
  } else {
    for (const film of data) {
      const b = new AdminTable(film);
      filmString += b.render();
    }
    document.querySelector('#c-table').innerHTML = filmString;
  }
};

export default admin;
